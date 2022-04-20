package com.capstone.sportsmate.service;

import com.capstone.sportsmate.domain.Apply;
import com.capstone.sportsmate.domain.Member;
import com.capstone.sportsmate.domain.PartyMember;
import com.capstone.sportsmate.domain.notice.Notice;
import com.capstone.sportsmate.domain.status.NoticeStatus;
import com.capstone.sportsmate.domain.status.Request;
import com.capstone.sportsmate.domain.status.Role;
import com.capstone.sportsmate.repository.MemberRepository;
import com.capstone.sportsmate.repository.NoticeRepository;
import com.capstone.sportsmate.repository.PartyRepository;
import com.capstone.sportsmate.web.ApplyForm;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class NoticeService {
    private final MemberRepository memberRepository;
    private final PartyRepository partyRepository;
    private final NoticeRepository noticeRepository;

    public Notice findOne(Long id){return noticeRepository.findOne(id);}

    @Transactional
    public List<Notice> findMyNotices(Long memberId){ // Notice 관련 소스코드
        Member member=memberRepository.findOne(memberId);

        return  noticeRepository.findNotices(member);
    }
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
    public ApplyForm getNoticeApply(Long noticeId){
        Notice notice = noticeRepository.findOne(noticeId);
        notice.setNoticeStatus(NoticeStatus.CONFIRM); //읽음 처리

        ApplyForm applyForm= new ApplyForm();
        Apply apply = notice.getApply();
        //================지원자 정보 =================//
        applyForm.setPartyTitle(apply.getParty().getTitle());
        applyForm.setMemberName(apply.getMember().getName());
        applyForm.setMemberEmail(apply.getMember().getEmail());
        applyForm.setSinceDate(apply.getSinceDate());
        applyForm.setState(apply.getState());

        return applyForm;
    }
    @Transactional
    public void acceptApply(long noticeId){
        Notice notice = noticeRepository.findOne(noticeId);
        Apply apply= notice.getApply();

        PartyMember partyMember= PartyMember.createPartyMember(apply.getMember(),apply.getParty(), Role.MEMBER, LocalDate.now());
        apply.setState(Request.ACCEPT);

        partyRepository.mkPartyMember(partyMember);
    }
    public void rejectApply(long noticeId){
        Notice notice = noticeRepository.findOne(noticeId);
        Apply apply= notice.getApply();

        apply.setState(Request.REJECT);
    }
}
