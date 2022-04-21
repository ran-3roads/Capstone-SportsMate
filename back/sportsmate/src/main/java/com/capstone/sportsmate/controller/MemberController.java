package com.capstone.sportsmate.controller;

import com.capstone.sportsmate.exception.LoginException;
import com.capstone.sportsmate.exception.response.ErrorResponse;
import com.capstone.sportsmate.jwt.JwtFilter;
import com.capstone.sportsmate.web.LoginForm;
import com.capstone.sportsmate.domain.Member;
import com.capstone.sportsmate.service.MemberService;
import com.capstone.sportsmate.web.MemberForm;
import com.capstone.sportsmate.jwt.TokenObject;
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

        return new ResponseEntity<String>("login",headers, HttpStatus.ACCEPTED);
    }
//    @PostMapping("/public/kakaoLogin") 카카오 로그인
//    public ResponseEntity<String> kakaoLogin(@RequestBody LoginForm loginForm, HttpServletResponse response){
//        TokenObject tokenObject = memberService.login(loginForm);
//        //보낼 쿠키설정 refreshToken을 추가
//        Cookie cookie = new Cookie("refreshToken",tokenObject.getRefreshToken());
//        cookie.setPath("/");//쿠키가 사용가능한 영역을 지정해줌
//        response.addCookie(cookie);
//        //헤더의 설정을 추가
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(new MediaType("application","json", Charset.forName("UTF-8")));
//        headers.setBearerAuth(tokenObject.getAccessToken());//Authorization: Bearer
//
//        return new ResponseEntity<String>("success",headers, HttpStatus.ACCEPTED);
//    }
    @GetMapping("/logout")
    public ResponseEntity<String> logout(@CookieValue(name="refreshToken") String refreshToken
            , @RequestHeader(value = JwtFilter.AUTHORIZATION_HEADER) String accessToken ,HttpServletResponse response){
        memberService.logout(accessToken.substring(7),refreshToken);//logout
        //쿠키설정 refreshToken을 제거
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

    @GetMapping("/public/reissue")//accesstoken재요청
    public ResponseEntity<String> reissue(@CookieValue(name="refreshToken") String refreshToken
            ) {
        String newAccessToken = memberService.reissue("",refreshToken);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application","json", Charset.forName("UTF-8")));
        headers.setBearerAuth(newAccessToken);//Authorization: Bearer

        return  new ResponseEntity<String>("reissue",headers, HttpStatus.ACCEPTED);
    }

//    @ExceptionHandler
//    public ResponseEntity<ErrorResponse> errorHandling(LoginException e) {
//        ErrorResponse response = new ErrorResponse();
//        response.setStatusCode(HttpStatus.NOT_FOUND.value());
//        response.setMessage(e.getMessage());
//        response.setTimestamp(System.currentTimeMillis());
//
//        return new ResponseEntity<>(response, HttpStatus.OK);
//    }


}
