package com.capstone.sportsmate.controller;
import com.capstone.sportsmate.service.PartyBoardService;
import com.capstone.sportsmate.web.CommentForm;
import com.capstone.sportsmate.web.PartyBoardForm;
import com.capstone.sportsmate.domain.PartyBoard;
import com.capstone.sportsmate.domain.Comment;

import com.capstone.sportsmate.domain.Party;
import com.capstone.sportsmate.domain.notice.Notice;
import com.capstone.sportsmate.exception.MyRoleException;
import com.capstone.sportsmate.web.PartySearch;
import com.capstone.sportsmate.service.MemberService;
import com.capstone.sportsmate.service.PartyService;
import com.capstone.sportsmate.web.PartyForm;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sportsmate/party")
@RequiredArgsConstructor
public class PartyController {
    private final PartyService partyService;
    private final MemberService memberService;
    private final PartyBoardService partyBoardService;
    
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
    String joinParty(@PathVariable("partyId") Long partyId){
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
    String createParty(@RequestBody PartyForm form){
        partyService.mkParty(form,memberService.getMyInfo().getId());
        return "success";
    }
    // --------------------파티 보드--------------------

    //----------조회----------
    @GetMapping("/{partyId}/partyboard")//해당파티 리스트 response로 따로 만드는 작업이 필요해보임 작성자와 id 제목만 보낸다던가
    List<PartyBoard> getPartyBoardList(@PathVariable("partyId") Long partyId){
        return partyBoardService.getPartyBoardList(partyId);
    }

    @GetMapping("/{partyId}/partyboard/{partyBoardId}")//게시글 선택시 글 리턴 혹은 변경페이지로 이동시 정보 반환
    PartyBoard partyBoardOne(@PathVariable("partyBoardId") Long partyBoardId){
        return partyBoardService.getPartyBoard(partyBoardId);
    }
    //----------생성----------
    @PostMapping("/{partyId}/mkpartyboard")//파티 게시판 작성
    String createPartyBoard(@RequestBody PartyBoardForm partyBoardForm ,@PathVariable("partyId") Long partyId){
        partyBoardService.createPartyBoard(partyId, partyBoardForm);
        return "mkparty";
    }
    //----------수정----------
    //    @GetMapping("/{partyId}/partyboard/{partyBoardId}/modify") //멤버 조회후 수정할 정보 리턴 아마 인증만 해주고 그전 내용 반영은 프론트에 맡겨도 될듯
    //    @PostMapping("/{partyId}/partyboard/{partyBoardId}/modify") //멤버 조회후 수정할 내용 반환
    //----------삭제----------
    //    @PostMapping("/{partyId}/partyboard/{partyBoardId}/delete") //멤버 조회후 삭제
    //--------------------댓글--------------------

    //----------조회----------

    @GetMapping("/{partyId}/partyboard/{partyBoardId}/comment")//게시글 선택시 게시글에 댓글들 리턴
    List<Comment> getCommentList(@PathVariable("partyBoardId") Long partyBoardId){
        return partyBoardService.getCommentList(partyBoardId);
    }

    //----------생성----------
    @PostMapping("/{partyId}/partyboard/{partyBoardId}/mkcomment")
    String createComment(@PathVariable("partyBoardId") Long partyBoardId, CommentForm commentForm) {
        partyBoardService.createComment(partyBoardId, commentForm);
        return "mkcomment";
    }
    //----------수정----------
    //    @GetMapping("/{partyId}/partyboard/{partyBoardId}/{commentId}/modify") //멤버 조회후 수정할 댓글 정보 리턴 아마 인증만 해주고 그전 내용 반영은 프론트에 맡겨도 될듯
    //    @PostMapping("/{partyId}/partyboard/{partyBoardId}/{commentId}/modify") //멤버 조회후 수정할 댓글 내용 반환
    //----------삭제----------
    //    @PostMapping("/{partyId}/partyboard/{partyBoardId}/{commentId}/delete") //멤버 조회후 댓글 삭제

}
