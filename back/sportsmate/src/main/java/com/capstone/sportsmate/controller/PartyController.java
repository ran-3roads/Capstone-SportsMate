package com.capstone.sportsmate.controller;
import com.capstone.sportsmate.domain.Arena;
import com.capstone.sportsmate.exception.InconsistencyException;
import com.capstone.sportsmate.exception.NotFoundEntityException;
import com.capstone.sportsmate.exception.response.ErrorResponse;
import com.capstone.sportsmate.service.PartyBoardService;
import com.capstone.sportsmate.service.RegistService;
import com.capstone.sportsmate.web.*;
import com.capstone.sportsmate.domain.PartyBoard;
import com.capstone.sportsmate.domain.Comment;

import com.capstone.sportsmate.domain.Party;
import com.capstone.sportsmate.exception.MyRoleException;
import com.capstone.sportsmate.service.MemberService;
import com.capstone.sportsmate.service.PartyService;
import com.capstone.sportsmate.web.response.CommentResponse;
import com.capstone.sportsmate.web.response.EventResponse;
import com.capstone.sportsmate.web.response.PartyBoardResponse;
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
    @PostMapping("/{partyId}/join") // 파티참가
    public String joinParty(@PathVariable("partyId") Long partyId){
        partyService.joinParty(partyId,memberService.getMyInfo().getId());
        return "success";
    }

    @GetMapping("/{partyId}/info")
    public Party viewParty(@PathVariable("partyId") Long partyId){
        Party party= partyService.findOne(partyId);
        return party;
    }

    @GetMapping("/{partyId}/info/modify")
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
    @GetMapping("/{partyId}/partyboard/{partyBoardId}/delete") //멤버 조회후 삭제
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
    @PostMapping("/{partyId}/partyboard/{partyBoardId}/mkcomment")
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
    @GetMapping("/{partyId}/partyboard/{partyBoardId}/comment/{commentId}/delete") //멤버 조회후 댓글 삭제
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


    // ------방장시점------
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
        if(registService.isFull(form)) {
            return "이미 예약이 되어 있습니다.";
        }

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




}
