package com.capstone.sportsmate.controller;

import com.capstone.sportsmate.domain.Authority;
import com.capstone.sportsmate.exception.LoginException;
import com.capstone.sportsmate.exception.response.LoginErrorResponse;
import com.capstone.sportsmate.repository.RefreshTokenRepository;
import com.capstone.sportsmate.security.TokenProvider;
import com.capstone.sportsmate.web.LoginForm;
import com.capstone.sportsmate.domain.Member;
import com.capstone.sportsmate.service.MemberService;
import com.capstone.sportsmate.web.MemberForm;
import com.capstone.sportsmate.web.TokenDto;
import com.capstone.sportsmate.web.TokenRequestDto;
import com.capstone.sportsmate.web.response.MemberResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/sportsmate/member")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    // 인증 코드들
    @PostMapping("/public/signup")
    //성공시 200과 이메일 리턴
    ResponseEntity<MemberResponse> signup(@RequestBody MemberForm memberForm){
        return ResponseEntity.ok(memberService.join(memberForm));
    }

    @PostMapping("/public/login")
    public ResponseEntity<TokenDto> login(@RequestBody LoginForm loginForm){
        return ResponseEntity.ok(memberService.login(loginForm));
    }

    @GetMapping("/private/my/modify")
    public ResponseEntity<Member> my(){
        return ResponseEntity.ok(memberService.getMyInfo());
    }

    @PostMapping("/reissue")
    public ResponseEntity<TokenDto> reissue(@RequestBody TokenRequestDto tokenRequestDto) {
        return ResponseEntity.ok(memberService.reissue(tokenRequestDto));
    }
    @ExceptionHandler
    public ResponseEntity<LoginErrorResponse> errorHandling(LoginException e) {
        LoginErrorResponse response = new LoginErrorResponse();
        response.setStatusCode(HttpStatus.NOT_FOUND.value());
        response.setMessage(e.getMessage());
        response.setTimestamp(System.currentTimeMillis());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("test")
    String testString(){
        return "test";
    }

}
