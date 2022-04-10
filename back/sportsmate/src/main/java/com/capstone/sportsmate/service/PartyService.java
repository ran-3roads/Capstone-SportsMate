package com.capstone.sportsmate.service;

import com.capstone.sportsmate.domain.Member;
import com.capstone.sportsmate.domain.Party;
import com.capstone.sportsmate.domain.PartyMember;
import com.capstone.sportsmate.domain.Role;
import com.capstone.sportsmate.repository.MemberRepository;
import com.capstone.sportsmate.repository.PartyRepository;
import com.capstone.sportsmate.repository.PartySearch;
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
        validateDuplicateParty(form);//중복 파티이름 검증
        Member member= memberRepository.findOne(id);
        Party party = Party.createParty(form.getSportsName(), form.getTitle(), form.getLocation(), form.getIntro(), LocalDate.now(),0,form.getInfo(),member);
        JoinPartytoHost(party,member); //파티멤버 추가
        partyRepository.save(party); // 파티 저장
        return party.getId();
    }
    private void JoinPartytoHost(Party party, Member member){
        PartyMember partyMember= PartyMember.createPartyMember(member,party, Role.HOST,LocalDate.now());
        partyRepository.mkPartyMember(partyMember);
    }

    private void validateDuplicateParty(PartyForm form) {
        Party findParty = partyRepository.findByTitle(form.getTitle());
        if(findParty!=null){
            throw new IllegalStateException("이미 존재하는 파티입니다.");
        }
    }

    public List<Party> findParties(Long id) { //멤버가 가입한 파티리스트 출력
        PartySearch partySearch= new PartySearch();
        Member member=memberRepository.findOne(id);
        partySearch.setMember(member);
        return partyRepository.findAllString(partySearch);
    }
}
