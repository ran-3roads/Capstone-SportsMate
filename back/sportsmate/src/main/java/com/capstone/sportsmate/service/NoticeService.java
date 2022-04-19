package com.capstone.sportsmate.service;

import com.capstone.sportsmate.domain.Apply;
import com.capstone.sportsmate.domain.Member;
import com.capstone.sportsmate.domain.Party;
import com.capstone.sportsmate.domain.PartyMember;
import com.capstone.sportsmate.domain.notice.Notice;
import com.capstone.sportsmate.domain.status.Role;
import com.capstone.sportsmate.repository.MemberRepository;
import com.capstone.sportsmate.repository.NoticeRepository;
import com.capstone.sportsmate.repository.PartyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        return noticeRepository.findNotices(member);
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
    public Apply confirmApply(Long noticeId){
        Notice notice = noticeRepository.findOne(noticeId);
        return notice.getApply();
    }
}
