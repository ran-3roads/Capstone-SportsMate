package com.capstone.sportsmate.service;

import com.capstone.sportsmate.domain.Comment;
import com.capstone.sportsmate.domain.Member;
import com.capstone.sportsmate.domain.Party;
import com.capstone.sportsmate.domain.PartyBoard;
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
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PartyBoardService {
    private final MemberRepository memberRepository;
    private final PartyRepository partyRepository;
    private final PartyBoardRepository partyBoardRepository;
    private final CommentRepository commentRepository;


    public List<PartyBoard> getPartyBoardList(Long partyId){//partyid로 partyboards 리턴
        Party party = partyRepository.findOne(partyId);
        return partyBoardRepository.findByParty(party);
    }

    public void createPartyBoard(Long partyId, PartyBoardForm partyBoardForm){
        Party party = partyRepository.findOne(partyId);
        Member member = memberRepository.findOne(SecurityUtil.getCurrentMemberId());
        PartyBoard partyBoard = PartyBoard.createPartyBoard(partyBoardForm.getCategory(), partyBoardForm.getTitle(),
                partyBoardForm.getContents(), LocalDate.now(), member, party);
        partyBoardRepository.save(partyBoard);
    }
    public PartyBoard getPartyBoard(Long PartyBoardId){
        return partyBoardRepository.findById(PartyBoardId)
                .orElseThrow(() -> new RuntimeException("지워진 게시판내용입니다."));
    }

    public List<Comment> getCommentList(Long partyBoardId){
       PartyBoard  partyBoard = partyBoardRepository.findById(partyBoardId)
               .orElseThrow(() -> new RuntimeException("지워진 게시판입니다."));
       return commentRepository.findByPartyBoard(partyBoard);
    }
    public void createComment(Long partyBoardId, CommentForm commentForm){
        PartyBoard  partyBoard = partyBoardRepository.findById(partyBoardId)
                .orElseThrow(() -> new RuntimeException("지워진 게시판입니다."));
        Member member = memberRepository.findOne(SecurityUtil.getCurrentMemberId());
        Comment comment = Comment.createComment(commentForm.getContents(), LocalDate.now(), member, partyBoard);
        commentRepository.save(comment);

    }
}
