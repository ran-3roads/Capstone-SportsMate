package com.capstone.sportsmate.service;

import com.capstone.sportsmate.domain.*;
import com.capstone.sportsmate.domain.notice.Apply;
import com.capstone.sportsmate.domain.notice.Notice;
import com.capstone.sportsmate.domain.notice.Reply;
import com.capstone.sportsmate.domain.status.NoticeStatus;
import com.capstone.sportsmate.domain.status.NoticeType;
import com.capstone.sportsmate.domain.status.Request;
import com.capstone.sportsmate.domain.status.Role;
import com.capstone.sportsmate.repository.MemberRepository;
import com.capstone.sportsmate.repository.NoticeRepository;
import com.capstone.sportsmate.repository.PartyRepository;
import com.capstone.sportsmate.web.ApplyForm;
import com.capstone.sportsmate.web.ReplyForm;
import com.capstone.sportsmate.web.response.NoticeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
        Member member=memberRepository.findOne(memberId);

        return  noticeRepository.findNotices(member).stream().map(Notice::toNoticeResponse).collect(Collectors.toList());
    }
    //----------알림 읽을수 있는지에 대한 권한 확인 메소드--------
    @Transactional
    public Boolean isRoute(Long noticeId,Long memberId){
        Notice notice = noticeRepository.findOne(noticeId);
        Member member = memberRepository.findOne(memberId);

        Notice authNotice= noticeRepository.isRoute(notice,member);
        if(authNotice==null){
            return false;
        }
        return true;
    }
    //------개인)apply entity를 직접 참조하지않고 form 담아서 데이터보냄---
    @Transactional
    public ApplyForm MemberGetNoticeApply(Long noticeId){
        Notice notice = noticeRepository.findOne(noticeId);
        notice.setNoticeStatus(NoticeStatus.CONFIRM); //읽음 처리

        Apply apply = notice.getApply();
        //================지원자 정보 =================//
        ApplyForm applyForm = apply.toApplyForm();
        return applyForm;
    }
    //------파티)apply entity를 직접 참조하지않고 form 담아서 데이터보냄---
    @Transactional
    public List<ApplyForm> PartyGetApplies(Long partyId){
        Party party = partyRepository.findOne(partyId);

        return noticeRepository.findApplies(party).stream().map(Apply::toApplyForm).collect(Collectors.toList());

    }
    //------reply entity를 직접 참조하지않고 form 담아서 데이터보냄---
    @Transactional
    public ReplyForm getNoticeReply(Long noticeId){
        Notice notice = noticeRepository.findOne(noticeId);
        notice.setNoticeStatus(NoticeStatus.CONFIRM); //읽음 처리

        ReplyForm replyForm= new ReplyForm();
        Reply reply = notice.getReply();
        //================지원자 정보 =================//
        replyForm.setPartyTitle(reply.getParty().getTitle());
        replyForm.setSinceDate(notice.getSinceDate());
        replyForm.setRequest(reply.getState());
        return replyForm;
    }
    @Transactional
    public void acceptApply(Long noticeId){
        Notice notice = noticeRepository.findOne(noticeId);
        Apply apply= notice.getApply();

        PartyMember partyMember= PartyMember.createPartyMember(apply.getMember(),apply.getParty(), Role.MEMBER, LocalDate.now());
        apply.setState(Request.ACCEPT);

        apply.getParty().addMember();
        sendReply(apply.getMember(),Request.ACCEPT,apply.getParty());

        partyRepository.mkPartyMember(partyMember);
    }
    @Transactional
    public void confirmNotice(Long noticeId){
        Notice notice = noticeRepository.findOne(noticeId);
        notice.setNoticeStatus(NoticeStatus.CONFIRM);
    }

    //-----------지원서 중복 승락 및 거절 방지----------
    public boolean validateDuplicateCheck(Long noticeId) {
        Notice notice = noticeRepository.findOne(noticeId);
        Apply apply= notice.getApply();
        if(apply.getState().equals(Request.WAITING)){ //대기 처리면 true
            return true;
        }
        return false; //수락 또는 거절했으면 false
    }

    //----------지원서에 대한 승락 및 거절 결과 보내줌-----------
    public void sendReply(Member toMember,Request request,Party party){
        Reply reply= Reply.createReply(request,party);
        Notice notice = Notice.createNotice(toMember, NoticeType.PARTYREPLY,NoticeStatus.UNCONFIRM, LocalDateTime.now());
        notice.setReply(reply);
        notice.setApply(null);

        noticeRepository.saveReply(reply);
        noticeRepository.saveNotice(notice);
    }
    public Notice findNoticeByApply(Long applyId){
        return noticeRepository.findNoticeByApply(noticeRepository.findApplyOne(applyId));
    }

}
