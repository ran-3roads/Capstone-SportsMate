package com.capstone.sportsmate.service;

import com.capstone.sportsmate.domain.*;
import com.capstone.sportsmate.domain.notice.Notice;
import com.capstone.sportsmate.domain.status.NoticeStatus;
import com.capstone.sportsmate.domain.status.NoticeType;
import com.capstone.sportsmate.domain.status.Request;
import com.capstone.sportsmate.domain.status.Role;
import com.capstone.sportsmate.repository.MemberRepository;
import com.capstone.sportsmate.repository.NoticeRepository;
import com.capstone.sportsmate.repository.PartyRepository;
import com.capstone.sportsmate.web.PartySearch;
import com.capstone.sportsmate.web.PartyForm;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PartyService {
    private final MemberRepository memberRepository;
    private final PartyRepository partyRepository;
    private final NoticeRepository noticeRepository;

    @Transactional
    public Long mkParty (PartyForm form, Long id){
        validateDuplicateParty(form.getTitle());//중복 파티이름 검증
        Member member= memberRepository.findOne(id);
        Party party = Party.createParty(form.getSportsName(), form.getTitle(), form.getLocation(), form.getIntro(), LocalDate.now(),1,form.getInfo());
        partyRepository.save(party); // 파티 저장
        JoinPartytoHost(party,member); //파티멤버 추가
        return party.getId();
    }
    @Transactional
    public Long joinParty (Long partyId, Long memberId){
        Member member= memberRepository.findOne(memberId);
        Party party= partyRepository.findOne(partyId);
        validateDuplicateApply(party,member);

        Member hostMember=memberRepository.findPartyHost(party);//해당 파티의 host 찾기
        Apply apply=Apply.createApply(Request.WAITING, LocalDateTime.now(),member,party);//apply 생성
        Notice notice=Notice.createNotice(hostMember,NoticeType.APPLY, NoticeStatus.UNCONFIRM,LocalDateTime.now());//notice 생성
        notice.setApply(apply);
        notice.setReply(null);
        noticeRepository.saveApply(apply);
        noticeRepository.saveNotice(notice);

        return party.getId();
    }

    @Transactional
    public void updateParty(Long partyId,String title,String intro,String info,String location){
        Party findParty = partyRepository.findOne(partyId);
        if(!title.equals(findParty.getTitle())) { //그전 타이틀과 같은지 확인
            validateDuplicateParty(title);//중복 파티이름 검증
        }
        findParty.setTitle(title);
        findParty.setIntro(intro);
        findParty.setInfo(info);
        findParty.setLocation(location);
    }
    public Party findOne(Long partyId){
        return partyRepository.findOne(partyId);
    }

    public boolean isCheckRole(Long partyId, Long memberId){
        Party party = partyRepository.findOne(partyId);
        Member member = memberRepository.findOne(memberId);
        PartyMember partyMember= partyRepository.isRole(party,member);
        if(partyMember==null) return false;
        if(!partyMember.getRole().equals(Role.HOST))return false;
        return true;
    }
    public boolean isPartyMember(Long partyId, Long memberId){
        Party party = partyRepository.findOne(partyId);
        Member member = memberRepository.findOne(memberId);
        PartyMember partyMember= partyRepository.isRole(party,member);

        if(partyMember==null) return false;
        if(!partyMember.getRole().equals(Role.HOST))return false;
        if(!partyMember.getRole().equals(Role.MEMBER))return false;

        return true;
    }
    public List<Party> getPartyList(){
       return partyRepository.findAll();
    }
    private void JoinPartytoMember(Party party, Member member){
        PartyMember partyMember= PartyMember.createPartyMember(member,party, Role.MEMBER,LocalDate.now());
        partyRepository.mkPartyMember(partyMember);
    }

    private void JoinPartytoHost(Party party, Member member){
        PartyMember partyMember= PartyMember.createPartyMember(member,party, Role.HOST,LocalDate.now());
        partyRepository.mkPartyMember(partyMember);
    }
    private void validateDuplicateParty(String title) {
        Party findParty = partyRepository.findByTitle(title);
        if(findParty!=null){
            throw new IllegalStateException("이미 존재하는 파티입니다.");
        }
    }
    private void validateDuplicateApply(Party party,Member member) {
        Apply apply = noticeRepository.findByApply(party,member);
        if(apply!=null){
            throw new IllegalStateException("이미 신청했던 파티입니다.");
        }
    }

    public List<Party> findMyParties(Long id) { //멤버가 가입한 파티리스트 출력
        PartySearch partySearch= new PartySearch();
        Member member=memberRepository.findOne(id);
        return partyRepository.findAllString(partySearch,member);
    }
    public List<Party> findSearchParties(PartySearch partySearch) { //멤버가 가입한 파티리스트 출력
        return partyRepository.SearchParties(partySearch);
    }
}
