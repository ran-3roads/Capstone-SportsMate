package com.capstone.sportsmate.service;

import com.capstone.sportsmate.domain.*;
import com.capstone.sportsmate.domain.notice.Apply;
import com.capstone.sportsmate.domain.notice.Notice;
import com.capstone.sportsmate.domain.notice.Reply;
import com.capstone.sportsmate.domain.status.NoticeStatus;
import com.capstone.sportsmate.repository.MemberRepository;
import com.capstone.sportsmate.repository.NoticeRepository;
import com.capstone.sportsmate.repository.PartyRepository;
import com.capstone.sportsmate.web.response.ApplyResponse;
import com.capstone.sportsmate.web.response.ReplyResponse;
import com.capstone.sportsmate.web.response.NoticeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class NoticeService {
    private final MemberRepository memberRepository;
    private final PartyRepository partyRepository;
    private final NoticeRepository noticeRepository;

    public Notice findOne(Long id){return noticeRepository.findOne(id);}

    @Transactional
    public List<NoticeResponse> findMyNotices(Long memberId){ // Notice 관련 소스코드
        Member member=memberRepository.findById(memberId)
                .orElseThrow(()->new RuntimeException("멤버를 찾을수 없습니다."));

        return  noticeRepository.findNotices(member).stream().map(Notice::toNoticeResponse).collect(Collectors.toList());
    }
    //----------알림 읽을수 있는지에 대한 권한 확인 메소드--------
    @Transactional
    public Boolean isRoute(Long noticeId,Long memberId){
        Notice notice = noticeRepository.findOne(noticeId);
        Member member = memberRepository.findById(memberId)
                .orElseThrow(()->new RuntimeException("멤버를 찾을수 없습니다."));

        Notice authNotice= noticeRepository.isRoute(notice,member);
        if(authNotice==null){
            return false;
        }
        return true;
    }
    //------개인)apply entity를 직접 참조하지않고 form 담아서 데이터보냄---
    @Transactional
    public ApplyResponse MemberGetNoticeApply(Long noticeId){
        Notice notice = noticeRepository.findOne(noticeId);
        notice.setNoticeStatus(NoticeStatus.CONFIRM); //읽음 처리

        Apply apply = notice.getApply();
        //================지원자 정보 =================//
        ApplyResponse applyForm = apply.toApplyForm();
        return applyForm;
    }
    //------파티)apply entity를 직접 참조하지않고 form 담아서 데이터보냄---
    @Transactional
    public List<ApplyResponse> PartyGetApplies(Long partyId){
        Party party = partyRepository.findById(partyId);

        return noticeRepository.findApplies(party).stream().map(Apply::toApplyForm).collect(Collectors.toList());

    }
    //------reply entity를 직접 참조하지않고 form 담아서 데이터보냄---
    @Transactional
    public ReplyResponse getNoticeReply(Long noticeId){
        Notice notice = noticeRepository.findOne(noticeId);
        notice.setNoticeStatus(NoticeStatus.CONFIRM); //읽음 처리

        ReplyResponse replyForm= new ReplyResponse();
        Reply reply = notice.getReply();
        //================지원자 정보 =================//
        replyForm.setPartyTitle(reply.getParty().getTitle());
        replyForm.setSinceDate(notice.getSinceDate());
        replyForm.setRequest(reply.getState());
        return replyForm;
    }

    @Transactional
    public void confirmNotice(Long noticeId){
        Notice notice = noticeRepository.findOne(noticeId);
        notice.setNoticeStatus(NoticeStatus.CONFIRM);
    }

}
