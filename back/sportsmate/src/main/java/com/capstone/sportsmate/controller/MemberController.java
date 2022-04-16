package com.capstone.sportsmate.controller;

import com.capstone.sportsmate.web.LoginForm;
import com.capstone.sportsmate.domain.Member;
import com.capstone.sportsmate.service.MemberService;
import com.capstone.sportsmate.web.MemberForm;
import com.capstone.sportsmate.web.TokenObject;
import com.capstone.sportsmate.web.TokenRequestDto;
import com.capstone.sportsmate.web.response.MemberResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.nio.charset.Charset;

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
    public ResponseEntity<String> login(@RequestBody LoginForm loginForm, HttpServletResponse response){
        TokenObject tokenObject = memberService.login(loginForm);
        //보낼 쿠키설정 refreshToken을 추가
        Cookie cookie = new Cookie("refreshToken",tokenObject.getRefreshToken());
        cookie.setPath("/");//쿠키가 사용가능한 영역을 지정해줌
        response.addCookie(cookie);
        //헤더의 설정을 추가
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application","json", Charset.forName("UTF-8")));
        headers.setBearerAuth(tokenObject.getAccessToken());//Authorization: Bearer

        return new ResponseEntity<String>("success",headers, HttpStatus.ACCEPTED);
    }
    @PostMapping("/public/kakaoLogin")
    public ResponseEntity<String> kakaoLogin(@RequestBody LoginForm loginForm, HttpServletResponse response){
        TokenObject tokenObject = memberService.login(loginForm);
        //보낼 쿠키설정 refreshToken을 추가
        Cookie cookie = new Cookie("refreshToken",tokenObject.getRefreshToken());
        cookie.setPath("/");//쿠키가 사용가능한 영역을 지정해줌
        response.addCookie(cookie);
        //헤더의 설정을 추가
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application","json", Charset.forName("UTF-8")));
        headers.setBearerAuth(tokenObject.getAccessToken());//Authorization: Bearer

        return new ResponseEntity<String>("success",headers, HttpStatus.ACCEPTED);
    }
    @GetMapping("/public/logout")
    public ResponseEntity<String> logout(HttpServletResponse response){
        //보낼 쿠키설정 refreshToken을 추가
        Cookie cookie = new Cookie("refreshToken",null);
        cookie.setPath("/");//쿠키가 사용가능한 영역을 지정해줌
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        return ResponseEntity.ok("logout");
    }

    @GetMapping("/private/my/modify")
    public ResponseEntity<Member> my(){
        return ResponseEntity.ok(memberService.getMyInfo());
    }

    @PostMapping("/reissue")
    public ResponseEntity<TokenObject> reissue(@RequestBody TokenRequestDto tokenRequestDto) {
        return ResponseEntity.ok(memberService.reissue(tokenRequestDto));
    }
//    @ExceptionHandler
//    public ResponseEntity<LoginErrorResponse> errorHandling(LoginException e) {
//        LoginErrorResponse response = new LoginErrorResponse();
//        response.setStatusCode(HttpStatus.NOT_FOUND.value());
//        response.setMessage(e.getMessage());
//        response.setTimestamp(System.currentTimeMillis());
//
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }


}
