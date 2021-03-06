package com.capstone.sportsmate.service;


import com.capstone.sportsmate.domain.*;
import com.capstone.sportsmate.domain.notice.Notice;
import com.capstone.sportsmate.domain.notice.Reply;
import com.capstone.sportsmate.domain.status.NoticeStatus;
import com.capstone.sportsmate.domain.status.NoticeType;
import com.capstone.sportsmate.domain.status.Request;
import com.capstone.sportsmate.exception.RegistException;
import com.capstone.sportsmate.repository.*;
import com.capstone.sportsmate.util.SecurityUtil;
import com.capstone.sportsmate.web.BookForm;
import com.capstone.sportsmate.web.RegistTimeForm;
import com.capstone.sportsmate.web.response.EventResponse;
import com.capstone.sportsmate.web.response.ScheduleResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RegistService {

    private final RegistRepository registRepository;
    private final PartyRepository partyRepository;
    private final MemberRepository memberRepository;
    private final JoinGameRepository joinGameRepository;
    private final MatchBoardRepository matchBoardRepository;
    private final NoticeRepository noticeRepository;
    private final ScheduleRepository scheduleRepository;

    @Transactional
    public void bookArena(BookForm bookForm,Long partyId){
        Party party= partyRepository.findOne(partyId);
        ArenaTime bookArenaTime=registRepository.findArenaTime(bookForm.getArenaTimeId());

        //예약 등록
        Regist regist=Regist.createRegist(bookForm.getDay(),bookArenaTime,bookArenaTime.getArena());
        registRepository.save(regist);

        //스케쥴 생성
        Schedule schedule=Schedule.createSchedule(bookArenaTime.getCredit(),0,
                bookForm.getMaxMember(), bookForm.getTitle(),bookForm.getContents(),regist,party);
        scheduleRepository.save(schedule);
    }
    @Transactional
    public void bookRegist(Long memberId, Long partyId, Long scheduleId){
        Schedule schedule=scheduleRepository.findById(scheduleId)
                .orElseThrow(()->new RuntimeException("찾는 스케줄이 없습니다."));
        ScheduleResponse scheduleResponse=schedule.toScheduleResponse();

        Regist regist=schedule.getRegist();
        Member member=memberRepository.findById(memberId)
                .orElseThrow(()->new RuntimeException("멤버를 찾을수 없습니다."));
        if(!validateBookRegist(member,regist)){
            throw  new RegistException("중복 예약입니다.");
        }
        if(member.getCredit()-(int)scheduleResponse.getNShotCredit()<0){ //돈 인출
            throw  new RegistException("금액이 부족합니다.");
        }
        member.withdraw((int)scheduleResponse.getNShotCredit());
        //정원 초과면 지원을 못함.
        if(schedule.isMaxMember()) {
            throw  new RegistException("정원 초과입니다.");
        }
        schedule.addCurrentMemeber();
        JoinGame joinGame= JoinGame.createJoinGame(member,regist);
        joinGameRepository.save(joinGame);

        // 모임이 성사되면 멤버 전원에게 보낸다.
        if(schedule.isMaxMember()){
            List<JoinGame>joinGames=joinGameRepository.findByRegist(schedule.getRegist());
            for(JoinGame j: joinGames) {
                sendCompleteReply(j.getMember(),schedule.getParty());
            }
        }

        MatchBoard matchBoard = matchBoardRepository.findByRegist(regist)
                .orElse(null);

        if(matchBoard==null)
            return;
        else
            matchBoard.addCurrentMember();
    }
    @Transactional
    public void cancelRegist(Long scheduleId, Long memberId){
//        if(!isAlreadyRegist(scheduleId)) throw new RegistException("예약하지도 않은 스케쥴입니다.");
        Schedule schedule= scheduleRepository.findById(scheduleId)
                .orElseThrow(()->new RuntimeException("찾는 스케줄이 없습니다."));
        ScheduleResponse scheduleResponse=schedule.toScheduleResponse();
        Member member=memberRepository.findById(memberId)
                .orElseThrow(()->new RuntimeException("멤버를 찾을수 없습니다."));;
        Regist regist=schedule.getRegist();
        schedule.minusCurrentMember();
        JoinGame joinGame=registRepository.findByMemberRegistToJoinGame(member,schedule.getRegist());
        joinGameRepository.deleteById(joinGame.getId());
        member.deposit((int)scheduleResponse.getNShotCredit());
        MatchBoard matchBoard = matchBoardRepository.findByRegist(regist)
                .orElse(null);
        if(matchBoard==null)
            return;
        else
            matchBoard.minusCurrentMember();
    }
    //모임 성사 됐음을 알리는 메시지
    public void sendCompleteReply(Member toMember,Party party){

        Reply reply= Reply.createReply(Request.ACCEPT,party);
        noticeRepository.saveReply(reply);
        Notice notice = Notice.createNotice(toMember, NoticeType.COMPLETEREPLY, NoticeStatus.UNCONFIRM, LocalDateTime.now());
        notice.setReply(reply);
        notice.setApply(null);

        noticeRepository.saveNotice(notice);
    }

    public boolean isAlreadyRegist(Long scheduleId){
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(()->new RuntimeException("찾는 스케줄이 없습니다."));

        Member member= memberRepository.findById(SecurityUtil.getCurrentMemberId())
                .orElseThrow(()->new RuntimeException("멤버를 찾을수 없습니다."));
        if(!validateBookRegist(member,schedule.getRegist())){
            return true; //이미예약했어
        }
        return false; // 예약안했음.
    }

    public List<ArenaTime> getPossibleTime(RegistTimeForm form, Long partyId){
        Party party= partyRepository.findOne(partyId);
        Arena findArena = registRepository.findArenaOne(form.getArenaId());

        //해당 경기장 예약들을 불러와라
        List<Regist> registList=registRepository.findArenaRegistByArena(findArena);

        List<ArenaTime> arenaTimes=registRepository.findArenaTimeByArena(findArena);
        //예약이 없다면 모든시간이 가능하독 보내라
        if(registList.isEmpty()){
            return arenaTimes;
        }

        //해당 날짜에 예약들을 불러와라 //수정해야함 작동안됨
        List<Regist> registList1=new ArrayList<>();

        for(Regist r: registList){
            registList.stream().filter(a ->a.getDay().isEqual(form.getDay()))
                    .collect(Collectors.toList())
                    .forEach(ls->{registList1.add(ls);});
        }
        for(Regist r : registList1){
            arenaTimes.stream().filter(a ->a.getId().equals(r.getArenaTime().getId()))
                    .collect(Collectors.toList())
                    .forEach(ls->{arenaTimes.remove(ls);});
        }

        return arenaTimes;
    }

    private boolean validateBookRegist (Member member,Regist regist) {
        JoinGame joinGame=registRepository.findByMemberRegistToJoinGame(member,regist);
        if(joinGame!=null){
            return false; //이미 존재하는 예약
        }
        return true; // 예약이 없습니다.
    }

    public List<EventResponse> getEventList(Long partyId){
        Party party= partyRepository.findOne(partyId);
        return registRepository.findByParty(party).stream().map(Schedule::toEventResponse).collect(Collectors.toList());
    }

    public List<Arena> getArenaList(Long partyId){
        Party party= partyRepository.findOne(partyId);
        return registRepository.findBySportsName(party.getSportsName());
    }


    public ScheduleResponse getSchedule(Long scheduleId){
        Schedule schedule= scheduleRepository.findById(scheduleId)
                .orElseThrow(()->new RuntimeException("찾는 스케줄이 없습니다."));

        return schedule.toScheduleResponse();
    }

}
