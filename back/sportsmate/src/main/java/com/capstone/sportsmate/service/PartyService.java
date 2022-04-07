package com.capstone.sportsmate.service;

import com.capstone.sportsmate.domain.Member;
import com.capstone.sportsmate.domain.Party;
import com.capstone.sportsmate.repository.MemberRepository;
import com.capstone.sportsmate.repository.PartyRepository;
import com.capstone.sportsmate.web.PartyForm;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PartyService {
    private final MemberRepository memberRepository;
    private final PartyRepository partyRepository;

    @Transactional
    public Long join (PartyForm form, String email){
        validateDuplicateParty(form);//중복 파티이름 검증
        Member member= memberRepository.findByEmail(email);
        Party party = Party.createParty(form.getSportsName(), form.getTitle(), form.getLocation(), form.getIntro(), LocalDate.now(),0,form.getInfo(),member);
        partyRepository.save(party);
        return party.getId();
    }
    private void validateDuplicateParty(PartyForm form) {
        Party findParty = partyRepository.findByTitle(form.getTitle());
        if(findParty!=null){
            throw new IllegalStateException("이미 존재하는 파티입니다.");
        }
    }
}
