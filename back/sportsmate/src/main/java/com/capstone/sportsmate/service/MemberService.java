package com.capstone.sportsmate.service;


import com.capstone.sportsmate.domain.Member;
import com.capstone.sportsmate.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;

    @Transactional
    public Long join (Member member){
        validateDuplicateMember(member);//중복 회원 검증
        memberRepository.save(member);
        return member.getId();
    }

    private Member findByEmail(String email){
        Member member =  memberRepository.findByEmail(email);
        return member;
    }
    private void validateDuplicateMember(Member member) {
        Member findMember = memberRepository.findByEmail(member.getEmail());
        if(findMember!=null){
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        }
    }
    public Member findOne(Long memberId){
        return memberRepository.findOne(memberId);
    }

    //login service
    public Member Login(String memberEmail,String password){
        Member findMember = memberRepository.findByEmail(memberEmail);
        if(findMember==null)//find member가 비었다면
            return null;
        if(!password.equals(findMember.getPassword()))
            return null;
        return findMember;
    }
}
