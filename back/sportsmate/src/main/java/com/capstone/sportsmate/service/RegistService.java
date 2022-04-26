package com.capstone.sportsmate.service;


import com.capstone.sportsmate.domain.*;
import com.capstone.sportsmate.exception.RegistException;
import com.capstone.sportsmate.repository.MemberRepository;
import com.capstone.sportsmate.repository.PartyRepository;
import com.capstone.sportsmate.repository.RegistRepository;
import com.capstone.sportsmate.web.BookForm;
import com.capstone.sportsmate.web.response.EventResponse;
import com.capstone.sportsmate.web.response.ScheduleResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RegistService {

    private final RegistRepository registRepository;
    private final PartyRepository partyRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public void bookArena(BookForm bookForm,Long arenaId,Long partyId){
        Party party= partyRepository.findOne(partyId);
        Arena bookArena = registRepository.findArenaOne(arenaId);

        //예약 등록
        Regist regist=Regist.createRegist(bookForm.getStartTime(),bookForm.getEndTime(),bookArena);
        registRepository.registSave(regist);

        //스케쥴 생성
        Schedule schedule=Schedule.createSchedule(bookArena.getCredit(),0,
                bookForm.getMaxMember(), bookForm.getTitle(),bookForm.getContents(),regist,party);
        registRepository.scheduleSave(schedule);
    }
    @Transactional
    public void bookRegist(Long memberId, Long partyId, Long scheduleId){
        Schedule schedule=registRepository.findSchedule(scheduleId);
        ScheduleResponse scheduleResponse=schedule.toScheduleResponse();

        Regist regist=schedule.getRegist();
        Member member=memberRepository.findOne(memberId);
        if(!validateBookRegist(member,regist)){
            throw  new RegistException("중복 예약입니다.");
        }
        if(member.getCredit()-(int)scheduleResponse.getNShotCredit()<0){ //돈 인출
            throw  new RegistException("금액이 부족합니다.");
        }
        member.withdraw((int)scheduleResponse.getNShotCredit());
        schedule.addCurrentMemeber();
        JoinGame joinGame= JoinGame.createJoinGame(member,regist);
        registRepository.joinGameSave(joinGame);
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
    public Arena getArenaInfo(Long arenaId){
        return registRepository.findArenaOne(arenaId);
    }

    public boolean isFull(BookForm bookForm,Long arenaId){
        //1. 경기장예약이있는지 없는지
        Arena bookArena = registRepository.findArenaOne(arenaId);
        List<Regist> registList=registRepository.findArenaRegist(bookArena);
        if(registList.isEmpty()){
            return false;
        }
        //2. 그 날에 예약이 되있는지확인하고 시작시간이 같은지 확인한다.
        if(!registList.stream().map(Regist::getStartTime).filter(bookForm.getStartTime()::equals).findFirst().isPresent()){
            return false; //시작하는 시간 같은게 없다면 false 반환
        }
        return true;
    }
    public ScheduleResponse getSchedule(Long scheduleId){
        Schedule schedule= registRepository.findSchedule(scheduleId);
        return schedule.toScheduleResponse();
    }

}
