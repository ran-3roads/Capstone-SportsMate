package com.capstone.sportsmate.service;

import com.capstone.sportsmate.domain.Comment;
import com.capstone.sportsmate.domain.Member;
import com.capstone.sportsmate.domain.Party;
import com.capstone.sportsmate.domain.PartyBoard;
import com.capstone.sportsmate.exception.InconsistencyException;
import com.capstone.sportsmate.exception.NotFoundEntityException;
import com.capstone.sportsmate.repository.CommentRepository;
import com.capstone.sportsmate.repository.MemberRepository;
import com.capstone.sportsmate.repository.PartyBoardRepository;
import com.capstone.sportsmate.repository.PartyRepository;
import com.capstone.sportsmate.util.SecurityUtil;
import com.capstone.sportsmate.web.CommentForm;
import com.capstone.sportsmate.web.PartyBoardForm;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PartyBoardService {


    private final MemberRepository memberRepository;
    private final PartyRepository partyRepository;
    private final PartyBoardRepository partyBoardRepository;
    private final CommentRepository commentRepository;

    // --------------------파티 보드--------------------

    //----------조회----------
    public List<PartyBoard> getPartyBoardList(Long partyId){//partyboard 리스트 리턴
        Party party = partyRepository.findOne(partyId);
        return partyBoardRepository.findByParty(party);
    }

    public PartyBoard getPartyBoard(Long PartyBoardId){//파티보드 조회
        return partyBoardRepository.findById(PartyBoardId)
                .orElseThrow(() -> new NotFoundEntityException("지워진 게시판입니다."));
    }
    //----------생성----------
    @Transactional
    public void createPartyBoard(Long partyId, PartyBoardForm partyBoardForm){//파티보드 생성
        Party party = partyRepository.findOne(partyId);
        Member member = memberRepository.findOne(SecurityUtil.getCurrentMemberId());
        PartyBoard partyBoard = PartyBoard.createPartyBoard(partyBoardForm.getCategory(), partyBoardForm.getTitle(),
                partyBoardForm.getContents(), LocalDate.now(), member, party);
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
                partyBoardForm.getContents(), LocalDate.now());
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
    public List<Comment> getCommentList(Long partyBoardId){//댓글 리스트 리턴
       PartyBoard  partyBoard = partyBoardRepository.findById(partyBoardId)
               .orElseThrow(() -> new NotFoundEntityException("지워진 게시판입니다."));
       return commentRepository.findByPartyBoard(partyBoard);
    }
    //----------생성----------
    @Transactional
    public void createComment(Long partyBoardId, CommentForm commentForm){//댓글 작성
        PartyBoard  partyBoard = partyBoardRepository.findById(partyBoardId)
                .orElseThrow(() -> new NotFoundEntityException("지워진 게시판입니다."));
        Member member = memberRepository.findOne(SecurityUtil.getCurrentMemberId());
        Comment comment = Comment.createComment(commentForm.getContents(), LocalDate.now(), member, partyBoard);
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
        comment.updateComment(commentForm.getContents(),LocalDate.now());
    }

    //----------삭제----------
    @Transactional
    public void deleteComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new NotFoundEntityException("지워진 댓글입니다."));
        commentRepository.delete(comment);
    }
}
