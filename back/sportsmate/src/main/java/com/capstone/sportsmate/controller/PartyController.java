package com.capstone.sportsmate.controller;
import com.capstone.sportsmate.domain.Arena;
import com.capstone.sportsmate.domain.notice.Notice;
import com.capstone.sportsmate.exception.RegistException;
import com.capstone.sportsmate.exception.InconsistencyException;
import com.capstone.sportsmate.exception.NotFoundEntityException;
import com.capstone.sportsmate.exception.response.ErrorResponse;
import com.capstone.sportsmate.service.*;
import com.capstone.sportsmate.web.*;
import com.capstone.sportsmate.domain.PartyBoard;
import com.capstone.sportsmate.domain.Comment;

import com.capstone.sportsmate.domain.Party;
import com.capstone.sportsmate.exception.MyRoleException;
import com.capstone.sportsmate.web.response.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sportsmate/party")
@RequiredArgsConstructor
public class PartyController {
    private final PartyService partyService;
    private final MemberService memberService;
    private final PartyBoardService partyBoardService;
    private final RegistService registService;
    private final MatchService matchService;
    private final NoticeService noticeService;


    @GetMapping()
    public List<Party> getPartyList(){
        return partyService.getPartyList();
    }

    @GetMapping("/myparty") //일단은 그냥 id 값 받는걸로 함 추후 security 숙지되면 변경할 예정
    public List<Party> myParty(){
        List<Party> parties = partyService.findMyParties(memberService.getMyInfo().getId());
        return parties;
    }
    @GetMapping("/search") //파티 검색
    public List<Party> search(@RequestBody PartySearch form){
        List<Party> parties= partyService.findSearchParties(form);
        return parties;
    }
    @GetMapping("/{partyId}/isPartyMember") //파티 멤버인지 아닌지 확인
    public boolean checkMember(@PathVariable("partyId") Long partyId){
        if(!partyService.isPartyMember(partyId,memberService.getMyInfo().getId())) {
            return false; // 멤버가 아니다
        }
        return true;
    }
    @GetMapping("/{partyId}/isPartyManager") //파티 방장인지 아닌지 확인
    public boolean checkManager(@PathVariable("partyId") Long partyId){
        if(!partyService.isCheckRole(partyId,memberService.getMyInfo().getId())) {
            return false; // 방장이 아니다.
        }
        return true;
    }
    @GetMapping("/{partyId}/alreadyApply") //waiting apply
    public boolean applyWaitForHost(@PathVariable("partyId") Long partyId){
        if(partyService.applyWaitForHost(partyId,memberService.getMyInfo().getId())) {
            return true;
        }
        return false;
    }

    @PostMapping("/{partyId}/join") // 파티참가
    public String joinParty(@RequestBody MemberApplyForm form,@PathVariable("partyId") Long partyId){
        partyService.joinParty(form,partyId,memberService.getMyInfo().getId());
        return "success";
    }

    @GetMapping("/{partyId}/info")  //*
    public PartyResponse viewParty(@PathVariable("partyId") Long partyId){
        return partyService.viewParty(partyId);
    }
    @GetMapping("/{partyId}/applyList")  //*
    public List<ApplyForm> viewPartyApply(@PathVariable("partyId") Long partyId){
        if(!partyService.isCheckRole(partyId,memberService.getMyInfo().getId())){ //exception 리턴타입 수정해야함
            throw new MyRoleException("확인 권한이 없습니다.");
        }
        List<ApplyForm> applyFormList= noticeService.PartyGetApplies(partyId);
        return applyFormList;
    }
    @PostMapping("/{partyId}/applyList/{applyId}/accept")  //*
    public String acceptPartyApply(@PathVariable("partyId") Long partyId,@PathVariable("applyId") Long applyId){
        if(!partyService.isCheckRole(partyId,memberService.getMyInfo().getId())){ //exception 리턴타입 수정해야함
            throw new MyRoleException("확인 권한이 없습니다.");
        }
        partyService.acceptApply(partyId,applyId);
        return "수락했습니다";
    }
    @PostMapping("/{partyId}/applyList/{applyId}/reject")  //*
    public String rejectPartyApply(@PathVariable("partyId") Long partyId,@PathVariable("applyId") Long applyId){
        partyService.rejectApply(partyId,applyId);
        return "거절했습니다.";
    }

    @GetMapping("/{partyId}/memberList")
    public List<PartyMemberResponse> partyMemberList(@PathVariable("partyId") Long partyId){
        return partyService.partyMemberList(partyId);
    }

    @DeleteMapping("/{partyId}/member/{partyMemberId}")
    public String deletePartyMember(@PathVariable("partyId") Long partyId,@PathVariable("partyMemberId") Long partyMemberId){
        partyService.deletePartyMember(partyId,partyMemberId);
        return "delete";
    }

    //파티 탈퇴
    @DeleteMapping("/{partyId}/member")
    public String leavePartyMember(@PathVariable("partyId") Long partyId){
        partyService.leavePartyMember(partyId);
        return "delete";
    }

    @GetMapping("/{partyId}/isHost")
    public boolean checkHost(@PathVariable("partyId") Long partyId){
        if(!partyService.isCheckRole(partyId,memberService.getMyInfo().getId())) {
            return false; // 방장 아니다
        }
        return true; //방장이다
    }

    @GetMapping("/{partyId}/modify") //*
    public Party editParty(@PathVariable("partyId") Long partyId){
        if(!partyService.isCheckRole(partyId,memberService.getMyInfo().getId())){
            throw new MyRoleException("수정 권한이 없습니다."); //exception 리턴타입 수정해야함
        }
        Party party= partyService.findOne(partyId);
        return party;
    }
    @PostMapping("/{partyId}/modify") // 방장 권한이 있는 유저만 검색가능
    public String updateItem(@RequestBody PartyForm form, @PathVariable("partyId") Long partyId){
        if(!partyService.isCheckRole(partyId,memberService.getMyInfo().getId())){ //exception 리턴타입 수정해야함
            throw new MyRoleException("수정 권한이 없습니다.");
        }
        partyService.updateParty( partyId,form.getTitle(), form.getIntro(), form.getInfo(),form.getLocation());
        return  "redirect";
    }

    @PostMapping("/mkparty") // 파티 만들기
    public String createParty(@RequestBody PartyForm form){
        partyService.mkParty(form,memberService.getMyInfo().getId());
        return "success";
    }
    // --------------------파티 보드--------------------

    //----------조회----------
    @GetMapping("/{partyId}/partyboard")//해당파티 리스트 response로 따로 만드는 작업이 필요해보임 작성자와 id 제목만 보낸다던가
    public List<PartyBoardResponse> getPartyBoardList(@PathVariable("partyId") Long partyId){
        return  partyBoardService.getPartyBoardList(partyId);
    }

    @GetMapping("/{partyId}/partyboard/{partyBoardId}")//게시글 선택시 글 리턴 혹은 변경페이지로 이동시 정보 반환
    public PartyBoardResponse partyBoardOne(@PathVariable("partyBoardId") Long partyBoardId){
        return partyBoardService.getPartyBoard(partyBoardId);
    }
    //----------생성----------
    @PostMapping("/{partyId}/mkpartyboard")//파티 게시판 작성
    public String createPartyBoard(@RequestBody PartyBoardForm partyBoardForm ,@PathVariable("partyId") Long partyId){
        partyBoardService.createPartyBoard(partyId, partyBoardForm);
        return "mkparty";
    }
    //----------수정----------
    @GetMapping("/{partyId}/partyboard/{partyBoardId}/modify") //멤버 조회후 수정할 정보 리턴 아마 인증만 해주고 그전 내용 반영은 프론트에 맡겨도 될듯
    public PartyBoard getPartyBoardModify(@PathVariable("partyBoardId") Long partyBoardId){
        return partyBoardService.verifiactionBoardMember(partyBoardId);//검증
    }
    @PostMapping("/{partyId}/partyboard/{partyBoardId}/modify") //멤버 조회후 수정할 내용 반환
    public String updatePartyBoard(@RequestBody PartyBoardForm partyBoardForm ,@PathVariable("partyBoardId") Long partyBoardId){
        partyBoardService.verifiactionBoardMember(partyBoardId);//검증
        partyBoardService.updatePartyBoard(partyBoardId, partyBoardForm);//변경
        return "modify";
    }
    //----------삭제----------
    @DeleteMapping("/{partyId}/partyboard/{partyBoardId}") //멤버 조회후 삭제
    public String deletePartyBoard(@PathVariable("partyBoardId") Long partyBoardId){
        partyBoardService.verifiactionBoardMember(partyBoardId);//검증
        partyBoardService.deletePartyBoard(partyBoardId);//삭제
        return "delete";
    }

    //--------------------댓글--------------------

    //----------조회----------

    @GetMapping("/{partyId}/partyboard/{partyBoardId}/comment")//게시글 선택시 게시글에 댓글들 리턴
    public List<CommentResponse> getCommentList(@PathVariable("partyBoardId") Long partyBoardId){
        return partyBoardService.getCommentList(partyBoardId);
    }

    //----------생성----------
    @PostMapping("/{partyId}/partyboard/{partyBoardId}/comment")
    public String createComment(@PathVariable("partyBoardId") Long partyBoardId,@RequestBody CommentForm commentForm) {
        partyBoardService.createComment(partyBoardId, commentForm);
        return "mkcomment";
    }
    //----------수정----------
    @GetMapping("/{partyId}/partyboard/{partyBoardId}/comment/{commentId}/modify") //멤버 조회후 수정할 댓글 정보 리턴 아마 인증만 해주고 그전 내용 반영은 프론트에 맡겨도 될듯
    public Comment getCommentModify(@PathVariable("commentId") Long commentId){
        return partyBoardService.verifiactionCommentMember(commentId);
    }
    @PostMapping("/{partyId}/partyboard/{partyBoardId}/comment/{commentId}/modify") //멤버 조회후 수정할 댓글 내용 반환
    public String updateComment(@PathVariable("commentId") Long commentId,@RequestBody CommentForm commentForm){
        partyBoardService.verifiactionCommentMember(commentId);
        partyBoardService.updateComment(commentId,commentForm);
        return "update";
    }
    //----------삭제----------
    @DeleteMapping("/{partyId}/partyboard/{partyBoardId}/comment/{commentId}") //멤버 조회후 댓글 삭제
    public String deleteComment(@PathVariable("commentId") Long commentId){
        partyBoardService.verifiactionCommentMember(commentId);//검증
        partyBoardService.deleteComment(commentId);//삭제
        return "delete";
    }

    // ----------------------파티일정------------------------
    // ------멤버시점------
    @GetMapping("/{partyId}/schedule") // 파티일정들 불러 오기
    public List<EventResponse> getEventList(@PathVariable("partyId") Long partyId){
        return registService.getEventList(partyId);
    }
    @GetMapping("/{partyId}/schedule/{scheduleId}") // 한 스케쥴 열람 //파티원이 아니면 못보게 만들어야함
    public ScheduleResponse getSchedule(@PathVariable("scheduleId") Long scheduleId){
        return registService.getSchedule(scheduleId);
    }
    @PostMapping("/{partyId}/schedule/{scheduleId}") // 한 스케쥴 열람 //파티원이 아니면 못보게 만들어야함
    String bookRegist(@PathVariable("scheduleId") Long scheduleId,@PathVariable("partyId") Long partyId){
        registService.bookRegist(memberService.getMyInfo().getId(),partyId,scheduleId);
        return "예약했습니다.";
    }



    // ------방장시점------
    @GetMapping("/{partyId}/schedule/{scheduleId}/applyList") // 스케줄로 용병신청 조회하기
    public ResponseEntity<List<MatchApplyResponse>> getMatchApply(@PathVariable("partyId") Long partyId, @PathVariable("scheduleId") Long scheduleId){
        if(!partyService.isCheckRole(partyId,memberService.getMyInfo().getId())){
            throw new MyRoleException("예약 권한이 없습니다.");
        }
        return ResponseEntity.ok(matchService.getMatchApplyList(scheduleId));
    }
    @GetMapping("/{partyId}/schedule/regist/getArenaList") // 파티 일정예약을 위해 경기장(arena) 정보들 불러오기 //팝업처리할지 물어봐야함
    public List<Arena> getArenaList(@PathVariable("partyId") Long partyId){
        if(!partyService.isCheckRole(partyId,memberService.getMyInfo().getId())){
            throw new MyRoleException("예약 권한이 없습니다.");
        }
        return registService.getArenaList(partyId);
    }
    @GetMapping("/{partyId}/schedule/regist/{arenaId}/book") // 경기장을 확인한다.
    public Arena getArenaInfo(@PathVariable("partyId") Long partyId, @PathVariable("arenaId") Long arenaId){
        if(!partyService.isCheckRole(partyId,memberService.getMyInfo().getId())){
            throw new MyRoleException("예약 권한이 없습니다.");
        }
        return registService.getArenaInfo(arenaId);
    }
    @PostMapping("/{partyId}/schedule/regist/{arenaId}/book") // 경기장을 예약한다.
    String bookArena(@RequestBody BookForm form,@PathVariable("partyId") Long partyId,@PathVariable("arenaId") Long arenaId){
        if(!partyService.isCheckRole(partyId,memberService.getMyInfo().getId())){
            throw new MyRoleException("예약 권한이 없습니다.");
        }
        //예약 차있는지 확인
        if(registService.isFull(form,arenaId)) {
            return "이미 예약이 되어 있습니다.";
        }
        registService.bookArena(form,arenaId,partyId);
        return "예약 되었습니다";
    }






    // --------------------투표--------------------
//    //----------조회----------
//    @GetMapping("/{partyId}/partyboard/{partyBoardId}/vote")//게시글 선택시 게시글에 댓글들 리턴
//    public List<Comment> getVoteList(@PathVariable("partyBoardId") Long partyBoardId){
//        return partyBoardService.getCommentList(partyBoardId);
//    }
//    //----------생성----------
//    @PostMapping("/{partyId}/partyboard/{partyBoardId}/mkvote")
//    public String createVote(@PathVariable("partyBoardId") Long partyBoardId,@RequestBody VoteForm voteForm) {
//        partyBoardService.createVote(partyBoardId, voteForm);
//        return "mkcomment";
//    }
//    //----------수정----------
//    @GetMapping("/{partyId}/partyboard/{partyBoardId}/vote/{voteId}/modify") //멤버 조회후 수정할 댓글 정보 리턴 아마 인증만 해주고 그전 내용 반영은 프론트에 맡겨도 될듯
//    public Comment getVoteModify(@PathVariable("commentId") Long commentId){
//        return partyBoardService.verifiactionCommentMember(commentId);
//    }
//    @PostMapping("/{partyId}/partyboard/{partyBoardId}/vote/{voteId}/modify") //멤버 조회후 수정할 댓글 내용 반환
//    public String updateVote(@PathVariable("commentId") Long commentId,@RequestBody CommentForm commentForm){
//        partyBoardService.verifiactionCommentMember(commentId);
//        partyBoardService.updateComment(commentId,commentForm);
//        return "update";
//    }
//    //----------삭제----------
//    @GetMapping("/{partyId}/partyboard/{partyBoardId}/vote/{voteId}/delete") //멤버 조회후 댓글 삭제
//    public String deleteVote(@PathVariable("commentId") Long commentId){
//        partyBoardService.verifiactionCommentMember(commentId);//검증
//        partyBoardService.deleteComment(commentId);//삭제
//        return "delete";
//    }
//







    //--------------------exceptionc처리--------------------
    //댓글 혹은 파티보드를 지울때 같은 멤버가 아닐때
    @ExceptionHandler(InconsistencyException.class)
    public ResponseEntity<ErrorResponse> inconsistencyExceptionhandling(InconsistencyException e) {
        ErrorResponse response = new ErrorResponse();
        response.setStatusCode(HttpStatus.FORBIDDEN.value());
        response.setMessage(e.getMessage());
        response.setTimestamp(System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
    }
    //변경할 파티보드가 없을때
    @ExceptionHandler(NotFoundEntityException.class)
    public ResponseEntity<ErrorResponse> notFoundEntityExceptionhandling(NotFoundEntityException e) {
        ErrorResponse response = new ErrorResponse();
        response.setStatusCode(HttpStatus.FORBIDDEN.value());
        response.setMessage(e.getMessage());
        response.setTimestamp(System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
    }
    //역할이 다를때
    @ExceptionHandler(MyRoleException.class)
    public ResponseEntity<ErrorResponse> myRoleExceptionhandling(MyRoleException e) {
        ErrorResponse response = new ErrorResponse();
        response.setStatusCode(HttpStatus.FORBIDDEN.value());
        response.setMessage(e.getMessage());
        response.setTimestamp(System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
    }
    //금액 부족할때
    public ResponseEntity<ErrorResponse> CreditException(RegistException e){
        ErrorResponse response = new ErrorResponse();
        response.setStatusCode(HttpStatus.FORBIDDEN.value());
        response.setMessage(e.getMessage());
        response.setTimestamp(System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
    }




}
