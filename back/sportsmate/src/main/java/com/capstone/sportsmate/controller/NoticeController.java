package com.capstone.sportsmate.controller;


import com.capstone.sportsmate.exception.MyRoleException;
import com.capstone.sportsmate.exception.response.ErrorResponse;
import com.capstone.sportsmate.service.MemberService;
import com.capstone.sportsmate.service.NoticeService;
import com.capstone.sportsmate.web.response.ApplyResponse;
import com.capstone.sportsmate.web.response.ReplyResponse;
import com.capstone.sportsmate.web.response.NoticeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sportsmate/notice")
@RequiredArgsConstructor
public class NoticeController {
    private final MemberService memberService;
    private final NoticeService noticeService;

    //-------------알림리스트 불러옴-----------
    @GetMapping()// Notice 관련 소스코드
    public List<NoticeResponse> noticeList(){
        return noticeService.findMyNotices(memberService.getMyInfo().getId());
    }
    //-------------파티 지원서 확인-----------
    @GetMapping("/{noticeId}/getApply") // 파티신청에 대한 지원서 확인.
    public ApplyResponse getApply(@PathVariable("noticeId") Long noticeId){
        if(!noticeService.isRoute(noticeId,memberService.getMyInfo().getId())){
            throw new MyRoleException("확인 권한이없습니다.");
        }
        return noticeService.MemberGetNoticeApply(noticeId);
    }
    //-------------파티 지원에 대한 결과-----------
    @GetMapping("/{noticeId}/getReply") // 파티신청에 대한 응답 확인.
    public ReplyResponse getReply(@PathVariable("noticeId") Long noticeId){
        if(!noticeService.isRoute(noticeId,memberService.getMyInfo().getId())){
            throw new MyRoleException("확인 권한이없습니다.");
        }
        return noticeService.getNoticeReply(noticeId);
    }

    //---------읽음 처리---------
    @PostMapping("/{noticeId}")
    String confirmNotice(@PathVariable("noticeId") Long noticeId){
        if(!noticeService.isRoute(noticeId,memberService.getMyInfo().getId())){
            throw new MyRoleException("확인 권한이없습니다.");
        }
        noticeService.confirmNotice(noticeId);
        return "확인했습니다."; //거절
    }
    //권한이 없을 경우
    @ExceptionHandler(MyRoleException.class)
    public ResponseEntity<ErrorResponse> myRoleExceptionhandling(MyRoleException e) {
        ErrorResponse response = new ErrorResponse();
        response.setStatusCode(HttpStatus.FORBIDDEN.value());
        response.setMessage(e.getMessage());
        response.setTimestamp(System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
    }
}
