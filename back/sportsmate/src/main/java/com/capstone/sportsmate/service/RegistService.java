package com.capstone.sportsmate.service;


import com.capstone.sportsmate.domain.*;
import com.capstone.sportsmate.exception.RegistException;
import com.capstone.sportsmate.repository.MemberRepository;
import com.capstone.sportsmate.repository.PartyRepository;
import com.capstone.sportsmate.repository.RegistRepository;
import com.capstone.sportsmate.web.BookForm;
import com.capstone.sportsmate.web.RegistTimeForm;
import com.capstone.sportsmate.web.response.ArenaResponse;
import com.capstone.sportsmate.web.response.EventResponse;
import com.capstone.sportsmate.web.response.ScheduleResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


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

    @Transactional
    public void bookArena(BookForm bookForm,Long partyId){
        Party party= partyRepository.findOne(partyId);
        ArenaTime bookArenaTime=registRepository.findArenaTime(bookForm.getArenaTimeId());

        //예약 등록
        Regist regist=Regist.createRegist(bookForm.getDay(),bookArenaTime,bookArenaTime.getArena());
        registRepository.registSave(regist);

        //스케쥴 생성
        Schedule schedule=Schedule.createSchedule(bookArenaTime.getCredit(),0,
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

    public List<ArenaTime> getPossibleTime(RegistTimeForm form, Long partyId){
        Party party= partyRepository.findOne(partyId);
        Arena findArena = registRepository.findArenaOne(form.getArenaId());

        //해당 경기장 예약들을 불러와라
        List<Regist> registList=registRepository.findArenaRegistByArena(findArena);
        //해당 날짜에 예약들을 불러와라
        registList.stream().filter(r->r.getDay().equals(form.getDay())).collect(Collectors.toList());

        List<ArenaTime> arenaTimes=registRepository.findArenaTimeByArena(findArena);

        //예약이 없다면 모든시간이 가능하독 보내라
        if(registList.isEmpty()){
            return arenaTimes;
        }
        //예약되어있는시간들을 제외하고 보내라
        for(Regist r : registList){
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

    public Arena getArenaInfo(Long arenaId){
        return registRepository.findArenaOne(arenaId);
    }

    public ScheduleResponse getSchedule(Long scheduleId){
        Schedule schedule= registRepository.findSchedule(scheduleId);
        return schedule.toScheduleResponse();
    }

}
