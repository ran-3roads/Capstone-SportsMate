package com.capstone.sportsmate.controller;


import com.capstone.sportsmate.domain.Apply;
import com.capstone.sportsmate.domain.notice.Notice;
import com.capstone.sportsmate.exception.MyRoleException;
import com.capstone.sportsmate.service.MemberService;
import com.capstone.sportsmate.service.NoticeService;
import com.capstone.sportsmate.service.PartyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sportsmate/notice")
@RequiredArgsConstructor
public class NoticeController {
    private final MemberService memberService;
    private final NoticeService noticeService;

    @GetMapping()// Notice 관련 소스코드
    public List<Notice> noticeList(){
        List<Notice> noticeList=noticeService.findMyNotices(memberService.getMyInfo().getId());
        return noticeList;
    }

    @GetMapping("/{noticeId}/getApply") // 파티신청에 대한 지원서 확인. // 읽었을경우 확인완료 변수 변
    public Apply getApply(@PathVariable("noticeId") Long noticeId){
        if(!noticeService.isRoute(noticeId,memberService.getMyInfo().getId())){
            throw new MyRoleException("확인 권한이없습니다."); // 입센션처리해야함.
        }
        return noticeService.confirmApply(noticeId);
    }

    @PostMapping("/{noticeId}/confirmApply")
    String confirmApply(@PathVariable("noticeId") Long noticeId){
        if(!noticeService.isRoute(noticeId,memberService.getMyInfo().getId())){
            throw new MyRoleException("확인 권한이없습니다."); // 입센션처리해야함.
        }
        return "수락"; //수락인지 아닌지 보내줄거 4/19 작업끝 여기서 부터해야함
    }
}
