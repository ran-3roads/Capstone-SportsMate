package com.capstone.sportsmate.service;

import com.capstone.sportsmate.domain.*;
import com.capstone.sportsmate.domain.status.Category;
import com.capstone.sportsmate.domain.status.Role;
import com.capstone.sportsmate.exception.InconsistencyException;
import com.capstone.sportsmate.exception.MyRoleException;
import com.capstone.sportsmate.exception.NotFoundEntityException;
import com.capstone.sportsmate.repository.CommentRepository;
import com.capstone.sportsmate.repository.MemberRepository;
import com.capstone.sportsmate.repository.PartyBoardRepository;
import com.capstone.sportsmate.repository.PartyRepository;
import com.capstone.sportsmate.util.SecurityUtil;
import com.capstone.sportsmate.web.CommentForm;
import com.capstone.sportsmate.web.PartyBoardForm;
import com.capstone.sportsmate.web.response.CommentResponse;
import com.capstone.sportsmate.web.response.PartyBoardResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PartyBoardService {
//공지면 우선순위 위로

    private final MemberRepository memberRepository;
    private final PartyRepository partyRepository;
    private final PartyBoardRepository partyBoardRepository;
    private final CommentRepository commentRepository;

    // --------------------파티 보드--------------------

    //----------조회----------
    public List<PartyBoardResponse> getPartyBoardList(Long partyId){//partyboard 리스트 리턴
        Party party = partyRepository.findOne(partyId);
        return partyBoardRepository.findByParty(party).stream().map(PartyBoard::toPartyBoardResponse).collect(Collectors.toList());
    }

    public PartyBoardResponse getPartyBoard(Long PartyBoardId){//파티보드 조회
        return partyBoardRepository.findById(PartyBoardId)
                .orElseThrow(() -> new NotFoundEntityException("지워진 게시판입니다.")).toPartyBoardResponse();
    }
    //----------생성----------
    @Transactional
    public void createPartyBoard(Long partyId, PartyBoardForm partyBoardForm){//파티보드 생성
        Party party = partyRepository.findOne(partyId);
        Member member = memberRepository.findOne(SecurityUtil.getCurrentMemberId());
        if(partyBoardForm.getCategory().equals(Category.NOTICE)){
            PartyMember partyMember = partyRepository.isRole(party,member);
            if(partyMember.getRole().equals(Role.MEMBER))
                throw new MyRoleException("방장이 아니면 생성이 불가합니다.");
            else if(partyMember.getRole().equals(null))//
                throw new RuntimeException("파티원이 아닙니다.");//상세한 에러를 정해줘야함
        }
        PartyBoard partyBoard = PartyBoard.createPartyBoard(partyBoardForm.getCategory(), partyBoardForm.getTitle(),
                partyBoardForm.getContents(), LocalDateTime.now(), member, party);
        partyBoardRepository.save(partyBoard);
    }

    //----------수정----------
    public PartyBoard verifiactionBoardMember(Long partyBoardId) {//파티보드 작성자 확인
        PartyBoard  partyBoard = partyBoardRepository.findById(partyBoardId)
                .orElseThrow(() -> new NotFoundEntityException("지워진 게시판입니다."));
        Member findMember = memberRepository.findOne(SecurityUtil.getCurrentMemberId());
        if(partyBoard.getMember().equals(findMember)){
            return partyBoard;
        } else {
            throw  new InconsistencyException("다른 멤버입니다..");
        }
    }
    @Transactional
    public void updatePartyBoard(Long partyBoardId,PartyBoardForm partyBoardForm){//파티보드 업데이트 jpa 변경감지 사용
        PartyBoard  partyBoard = partyBoardRepository.findById(partyBoardId)
                .orElseThrow(() -> new NotFoundEntityException("지워진 게시판입니다."));
        partyBoard.updatePartyBoard(partyBoardForm.getCategory(), partyBoardForm.getTitle(),
                partyBoardForm.getContents(), LocalDateTime.now());
    }

    //----------삭제----------
    @Transactional
    public void deletePartyBoard(Long partyBoardId) {//파티보드 제거
        PartyBoard  partyBoard = partyBoardRepository.findById(partyBoardId)
                .orElseThrow(() -> new NotFoundEntityException("지워진 게시판입니다."));
        partyBoardRepository.delete(partyBoard);
    }

    // -------------------- 댓글 --------------------

    //----------조회----------
    public List<CommentResponse> getCommentList(Long partyBoardId){//댓글 리스트 리턴
       PartyBoard  partyBoard = partyBoardRepository.findById(partyBoardId)
               .orElseThrow(() -> new NotFoundEntityException("지워진 게시판입니다."));
       return commentRepository.findByPartyBoard(partyBoard).stream().map(Comment::toCommentResponse).collect(Collectors.toList());
    }
    //----------생성----------
    @Transactional
    public void createComment(Long partyBoardId, CommentForm commentForm){//댓글 작성
        PartyBoard  partyBoard = partyBoardRepository.findById(partyBoardId)
                .orElseThrow(() -> new NotFoundEntityException("지워진 게시판입니다."));
        Member member = memberRepository.findOne(SecurityUtil.getCurrentMemberId());
        Comment comment = Comment.createComment(commentForm.getContents(), LocalDateTime.now(), member, partyBoard);
        commentRepository.save(comment);

    }

    //----------수정----------
    public Comment verifiactionCommentMember(Long commentId ) {//댓글 작성자 확인
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new NotFoundEntityException("지워진 댓글입니다."));
        Member findMember = memberRepository.findOne(SecurityUtil.getCurrentMemberId());
        if(comment.getMember().equals(findMember)){
            return comment;
        } else {
            throw  new InconsistencyException("다른 멤버입니다..");
        }
    }
    @Transactional
    public void updateComment(Long commentId, CommentForm commentForm) {//댓글 수정 변경감지 사용
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new NotFoundEntityException("지워진 댓글입니다."));
        comment.updateComment(commentForm.getContents(),LocalDateTime.now());
    }

    //----------삭제----------
    @Transactional
    public void deleteComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new NotFoundEntityException("지워진 댓글입니다."));
        commentRepository.delete(comment);
    }
    //---------검증----------
    public boolean isWriter(Long partyBoardId) {//파티보드 작성자 확인
        PartyBoard  partyBoard = partyBoardRepository.findById(partyBoardId)
                .orElseThrow(() -> new NotFoundEntityException("지워진 게시판입니다."));
        Member findMember = memberRepository.findOne(SecurityUtil.getCurrentMemberId());
        if(partyBoard.getMember().equals(findMember)){
            return true;
        } else {
            return false;
        }
    }
}
