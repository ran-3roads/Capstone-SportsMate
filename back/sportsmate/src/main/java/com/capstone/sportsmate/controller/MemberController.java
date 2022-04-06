package com.capstone.sportsmate.controller;

import com.capstone.sportsmate.web.LoginForm;
import com.capstone.sportsmate.domain.Member;
import com.capstone.sportsmate.service.MemberService;
import com.capstone.sportsmate.web.MemberForm;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/sportsmate/member")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    @PostMapping("signup")
    String signUP(@RequestBody MemberForm memberForm){
        Member member = Member.createMember(memberForm.getName(), memberForm.getSex(), memberForm.getEmail(),
                memberForm.getNickName(), memberForm.getPassword(), LocalDate.now(), memberForm.getBirthDate()
                , memberForm.getPhoneNumber());
        memberService.join(member);
        return "success";
    }

    @PostMapping("login")
    Member loginMember(@RequestBody LoginForm loginForm){
        Member member = memberService.Login(loginForm.getEmail(), loginForm.getPassword());
        if(member == null)
            return null;
        return member;
    }

    @GetMapping("test")
    String testString(){
        return "test";
    }

}
