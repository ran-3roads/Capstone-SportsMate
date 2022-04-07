package com.capstone.sportsmate.controller;

import com.capstone.sportsmate.exception.LoginException;
import com.capstone.sportsmate.exception.response.LoginErrorResponse;
import com.capstone.sportsmate.web.LoginForm;
import com.capstone.sportsmate.domain.Member;
import com.capstone.sportsmate.service.MemberService;
import com.capstone.sportsmate.web.MemberForm;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
            throw new LoginException("아이디와 비밀번호가 틀렸습니다.");
        return member;
    }
    @ExceptionHandler
    public ResponseEntity<LoginErrorResponse> errorHandling(LoginException e) {
        LoginErrorResponse response = new LoginErrorResponse();
        response.setStatusCode(HttpStatus.NOT_FOUND.value());
        response.setMessage(e.getMessage());
        response.setTimestamp(System.currentTimeMillis());

        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @GetMapping("test")
    String testString(){
        return "test";
    }

}
