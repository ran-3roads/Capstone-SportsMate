package com.capstone.sportsmate.controller;


import com.capstone.sportsmate.domain.notice.Notice;
import com.capstone.sportsmate.exception.MyRoleException;
import com.capstone.sportsmate.exception.response.ErrorResponse;
import com.capstone.sportsmate.service.MemberService;
import com.capstone.sportsmate.service.NoticeService;
import com.capstone.sportsmate.web.ApplyForm;
import com.capstone.sportsmate.web.ReplyForm;
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
    public List<Notice> noticeList(){
        List<Notice> noticeList=noticeService.findMyNotices(memberService.getMyInfo().getId());
        return noticeList;
    }
    //-------------파티 지원서 확인-----------
    @GetMapping("/{noticeId}/getApply") // 파티신청에 대한 지원서 확인.
    public ApplyForm getApply(@PathVariable("noticeId") Long noticeId){
        if(!noticeService.isRoute(noticeId,memberService.getMyInfo().getId())){
            throw new MyRoleException("확인 권한이없습니다.");
        }
        return noticeService.MemberGetNoticeApply(noticeId);
    }
    //-------------파티 지원에 대한 결과-----------
    @GetMapping("/{noticeId}/getReply") // 파티신청에 대한 응답 확인.
    public ReplyForm getReply(@PathVariable("noticeId") Long noticeId){
        if(!noticeService.isRoute(noticeId,memberService.getMyInfo().getId())){
            throw new MyRoleException("확인 권한이없습니다.");
        }
        return noticeService.getNoticeReply(noticeId);
    }

    //-------------파티 승락-----------------
    @PostMapping("/{noticeId}/acceptApply")
    String acceptApply(@PathVariable("noticeId") Long noticeId){
        if(!noticeService.isRoute(noticeId,memberService.getMyInfo().getId())){
            throw new MyRoleException("확인 권한이없습니다.");
        }
        if(!noticeService.validateDuplicateCheck(noticeId)){
            return "이미 처리한 지원서 입니다.";
        }
        noticeService.acceptApply(noticeId);
        return "수락했습니다."; //수락
    }
    //-------------파티 거절-----------------
    @PostMapping("/{noticeId}/rejectApply")
    String rejectApply(@PathVariable("noticeId") Long noticeId){
        if(!noticeService.isRoute(noticeId,memberService.getMyInfo().getId())){
            throw new MyRoleException("확인 권한이없습니다.");
        }
        if(!noticeService.validateDuplicateCheck(noticeId)){
            return "이미 처리한 지원서 입니다.";
        }
        noticeService.rejectApply(noticeId);
        return "거절했습니다."; //거절
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
