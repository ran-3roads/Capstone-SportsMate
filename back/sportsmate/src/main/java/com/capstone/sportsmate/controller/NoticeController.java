package com.capstone.sportsmate.controller;


import com.capstone.sportsmate.domain.Apply;
import com.capstone.sportsmate.domain.notice.Notice;
import com.capstone.sportsmate.domain.status.Request;
import com.capstone.sportsmate.exception.MyRoleException;
import com.capstone.sportsmate.service.MemberService;
import com.capstone.sportsmate.service.NoticeService;
import com.capstone.sportsmate.service.PartyService;
import com.capstone.sportsmate.web.ApplyForm;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sportsmate/notice")
@RequiredArgsConstructor
public class NoticeController {
    private final MemberService memberService;
    private final NoticeService noticeService;

    @GetMapping()// Notice 관련 소스코드, 알림을 확인했던거에 대한 처리 해줘야함 영속성 학술자료 검토 요망 4/20
    public List<Notice> noticeList(){
        List<Notice> noticeList=noticeService.findMyNotices(memberService.getMyInfo().getId());
        return noticeList;
    }
    //거절 또는 수락 되었다는 알림 만들어야함
    @GetMapping("/{noticeId}/getApply") // 파티신청에 대한 지원서 확인. // 읽었을경우 확인완료 변수 변
    public ApplyForm getApply(@PathVariable("noticeId") Long noticeId){
        if(!noticeService.isRoute(noticeId,memberService.getMyInfo().getId())){
            throw new MyRoleException("확인 권한이없습니다."); // 입센션처리해야함.
        }
        return noticeService.getNoticeApply(noticeId);
    }

    @PostMapping("/{noticeId}/acceptApply")
    String acceptApply(@PathVariable("noticeId") Long noticeId){
        if(!noticeService.isRoute(noticeId,memberService.getMyInfo().getId())){
            throw new MyRoleException("확인 권한이없습니다."); // 입센션처리해야함.
        }
        noticeService.acceptApply(noticeId);
        return "수락했습니다."; //수락
    }

    @PostMapping("/{noticeId}/rejectApply")
    String rejectApply(@PathVariable("noticeId") Long noticeId){
        if(!noticeService.isRoute(noticeId,memberService.getMyInfo().getId())){
            throw new MyRoleException("확인 권한이없습니다."); // 입센션처리해야함.
        }
        noticeService.rejectApply(noticeId);
        return "거절했습니다."; //거절
    }
}
