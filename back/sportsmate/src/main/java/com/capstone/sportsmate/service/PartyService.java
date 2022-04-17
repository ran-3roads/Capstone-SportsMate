package com.capstone.sportsmate.service;

import com.capstone.sportsmate.domain.Member;
import com.capstone.sportsmate.domain.Party;
import com.capstone.sportsmate.domain.PartyMember;
import com.capstone.sportsmate.domain.status.Role;
import com.capstone.sportsmate.repository.MemberRepository;
import com.capstone.sportsmate.repository.PartyRepository;
import com.capstone.sportsmate.web.PartySearch;
import com.capstone.sportsmate.web.PartyForm;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PartyService {
    private final MemberRepository memberRepository;
    private final PartyRepository partyRepository;

    @Transactional
    public Long mkParty (PartyForm form, Long id){
        validateDuplicateParty(form.getTitle());//중복 파티이름 검증
        Member member= memberRepository.findOne(id);
        Party party = Party.createParty(form.getSportsName(), form.getTitle(), form.getLocation(), form.getIntro(), LocalDate.now(),0,form.getInfo());
        partyRepository.save(party); // 파티 저장
        JoinPartytoHost(party,member); //파티멤버 추가
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
    @Transactional
    public boolean isCheckRole(Long partyId, Long memberId){
        Party party = partyRepository.findOne(partyId);
        Member member = memberRepository.findOne(memberId);
        PartyMember partyMember= partyRepository.isRole(party,member);
        if(partyMember==null) return false;
        if(!partyMember.getRole().equals(Role.HOST))return false;

        return true;
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

    public List<Party> findMyParties(Long id) { //멤버가 가입한 파티리스트 출력
        PartySearch partySearch= new PartySearch();
        Member member=memberRepository.findOne(id);
        return partyRepository.findAllString(partySearch,member);
    }
    public List<Party> findSearchParties(PartySearch partySearch) { //멤버가 가입한 파티리스트 출력
        return partyRepository.SearchParties(partySearch);
    }
}
