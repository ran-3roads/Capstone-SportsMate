package com.capstone.sportsmate.controller;


import com.capstone.sportsmate.domain.MatchBoard;
import com.capstone.sportsmate.domain.Schedule;
import com.capstone.sportsmate.service.MatchService;
import com.capstone.sportsmate.service.MemberService;
import com.capstone.sportsmate.service.PartyService;
import com.capstone.sportsmate.service.RegistService;
import com.capstone.sportsmate.web.MatchApplyForm;
import com.capstone.sportsmate.web.MatchForm;
import com.capstone.sportsmate.web.response.MatchBoardListResponse;
import com.capstone.sportsmate.web.response.MatchBoardResponse;
import com.capstone.sportsmate.web.response.MyGameResponse;
import com.capstone.sportsmate.web.response.ScheduleResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sportsmate/match")
@RequiredArgsConstructor
public class MatchController {
    private final MatchService matchService;
    private final PartyService partyService;
    private final MemberService memberService;

    // --------------------매치 보드--------------------

    //----------생성----------
    //방장이 매치보드 작성
    @PostMapping("/board/create/{scheduleId}")
    ResponseEntity<String> createMatchBoard(@RequestBody MatchForm matchForm, @PathVariable("scheduleId") Long scheduleId){
        matchService.createMatchBoard(matchForm,scheduleId);
        //역할을 조회할 필요가있음 나중에 refactoring하면서 만드는게 좋을듯 // 해결!
        return ResponseEntity.ok("hire create");
    }

    //----------조회----------


    @GetMapping("/board/create/{scheduleId}") //이미 존재하는지?
    ResponseEntity<Boolean> isMatchBoard(@PathVariable("scheduleId") Long scheduleId){
        return ResponseEntity.ok(matchService.isMatchBoard(scheduleId));
    }

    @GetMapping("/my")//나의 경기 리스트
    ResponseEntity<List<MyGameResponse>> getMyMatchBoardList(){
        return ResponseEntity.ok(matchService.getMyGameList());
    }
    @GetMapping("/myMatch/{registId}")//매치 게시판 클릭시 단일조회
    ResponseEntity<ScheduleResponse> getMyMatch(@PathVariable("registId") Long registId){
        return ResponseEntity.ok(matchService.getMyMatch(registId));
    }
    @GetMapping("/public/board")//매치보드 게시판 페이지 들어올때 모든 리스트 넘기기
    ResponseEntity<List<MatchBoardListResponse>> getMatchBoardList(){
        return ResponseEntity.ok(matchService.getMatchBoardList());
    }
    @GetMapping("/board/{matchBoardId}")//매치 게시판 클릭시 단일조회
    ResponseEntity<MatchBoardResponse> getMatchBoard(@PathVariable("matchBoardId") Long matchBoardId){
        return ResponseEntity.ok(matchService.getMatchBoardResponse(matchBoardId));
    }
    @GetMapping("/board/{matchBoardId}/isPartyMember")
    public boolean isParty(@PathVariable("matchBoardId") Long matchBoardId){
        MatchBoard matchBoard=matchService.findMathBoard(matchBoardId);
        Schedule findSchedule=matchService.findScheduleByRegist(matchBoard.getRegist());
        if(!partyService.isPartyMember(findSchedule.getParty().getId(),memberService.getMyInfo().getId()))
            return false; // 멤버가 아니다
        return true; //멤버다.
    }

    //----------수정----------

    //----------삭제----------
    // --------------------용병 신청--------------------
    //----------생성----------
    //용병신청서 생성
    @PostMapping("/apply")
    ResponseEntity<String> createMatchApply(@RequestBody MatchApplyForm matchApplyForm){
        System.out.println("hihi");
        matchService.createMatchApply(matchApplyForm);
        return ResponseEntity.ok("apply");
    }
    //----------조회----------
//    @GetMapping("/{matchBoardId}/apply")
//    ResponseEntity<String> getMatchApply(MatchApplyForm matchApplyForm){
//        matchService.createMatchApply(matchApplyForm);
//        return ResponseEntity.ok("apply");
//    }
    //----------수정----------
    //수락
    @GetMapping("/apply/{matchApplyId}/accept")
    ResponseEntity<String> acceptMatchApply(@PathVariable("matchApplyId") Long matchApplyId){
        matchService.accptMatchApply(matchApplyId);
        return ResponseEntity.ok("accept");
    }
    //거절
    @GetMapping("/apply/{matchApplyId}/reject")
    ResponseEntity<String> rejectMatchApply(@PathVariable("matchApplyId") Long matchApplyId){
        matchService.rejectMatchApply(matchApplyId);
        return ResponseEntity.ok("reject");
    }
    //----------삭제----------






}
