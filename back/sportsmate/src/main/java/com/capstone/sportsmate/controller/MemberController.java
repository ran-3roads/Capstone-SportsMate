package com.capstone.sportsmate.controller;

import com.capstone.sportsmate.domain.Member;
import com.capstone.sportsmate.service.MemberService;
import com.capstone.sportsmate.web.MemberForm;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

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

    @GetMapping("test")
    String testString(){
        return "test";
    }

}
