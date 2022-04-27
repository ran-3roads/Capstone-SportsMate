package com.capstone.sportsmate.controller;


import com.capstone.sportsmate.service.MatchService;
import com.capstone.sportsmate.web.MatchApplyForm;
import com.capstone.sportsmate.web.MatchForm;
import com.capstone.sportsmate.web.response.MatchBoardListResponse;
import com.capstone.sportsmate.web.response.MatchBoardResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sportsmate/match")
@RequiredArgsConstructor
public class MatchController {
    private final MatchService matchService;

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
    @GetMapping("/board")//매치보드 게시판 페이지 들어올때 모든 리스트 넘기기
    ResponseEntity<List<MatchBoardListResponse>> getMatchBoardList(){
        return ResponseEntity.ok(matchService.getMatchBoardList());
    }
    @GetMapping("/board/{matchBoardId}")//매치 게시판 클릭시 단일조회
    ResponseEntity<MatchBoardResponse> getMatchBoard(@PathVariable("matchBoardId") Long matchBoardId){
        return ResponseEntity.ok(matchService.getMatchBoardResponse(matchBoardId));
    }
    //----------수정----------

    //----------삭제----------
    // --------------------용병 신청--------------------
    //----------생성----------
    //용병신청서 생성
    @PostMapping("/apply")
    ResponseEntity<String> createMatchApply(MatchApplyForm matchApplyForm){
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
    @GetMapping("/apply/{applyId}/accept")
    ResponseEntity<String> acceptMatchApply(@PathVariable("matchApplyId") Long matchApplyId){
        matchService.accptMatchApply(matchApplyId);
        return ResponseEntity.ok("accept");
    }
    //거절
    @GetMapping("/apply/{applyId}/reject")
    ResponseEntity<String> rejectMatchApply(@PathVariable("matchApplyId") Long matchApplyId){
        matchService.rejectMatchApply(matchApplyId);
        return ResponseEntity.ok("reject");
    }
    //----------삭제----------






}
