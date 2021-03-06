package com.capstone.sportsmate.domain.notice;

import com.capstone.sportsmate.domain.Member;
import com.capstone.sportsmate.domain.status.NoticeStatus;
import com.capstone.sportsmate.domain.status.NoticeType;
import com.capstone.sportsmate.web.response.NoticeResponse;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "notice")
@Getter@Setter
public class Notice { // 알림 Entity
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="notice_id")
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Enumerated(EnumType.STRING)
    @Column(name="notice_status")
    private NoticeStatus noticeStatus;

    @Enumerated(EnumType.STRING)
    @Column(name="notice_type")
    private NoticeType noticeType;

    @Column(name="since_date")
    private LocalDateTime sinceDate;//가입날짜

    @JsonIgnore
    @OneToOne(fetch = LAZY)
    @JoinColumn(name="apply_id") // 지원서
    private Apply apply;

    @JsonIgnore
    @OneToOne(fetch = LAZY)
    @JoinColumn(name="reply_id") // 지원서에 대한 응답
    private Reply reply;

    @JsonIgnore
    @OneToOne(fetch = LAZY)
    @JoinColumn(name="match_apply_id") // 지원서에 대한 응답
    private MatchApply matchApply;


    public static Notice createNotice(Member member,NoticeType noticeType, NoticeStatus noticeStatus, LocalDateTime sinceDate) {
        Notice notice = new Notice();
        notice.member=member;
        notice.noticeType=noticeType;
        notice.noticeStatus=noticeStatus;
        notice.sinceDate=sinceDate;
        return notice;
    }

    public NoticeResponse toNoticeResponse(){
        if(apply!=null)
        return new NoticeResponse(id,sinceDate, noticeStatus, noticeType,apply.getMember().getNickName()
                ,apply.getParty().getId(),apply.getState());
        else if(reply!=null)
            return new NoticeResponse(id,sinceDate, noticeStatus, noticeType,reply.getParty().getTitle()
                    ,reply.getParty().getId(),reply.getState());
        else if(matchApply!=null)
            return new NoticeResponse(id,sinceDate, noticeStatus, noticeType,matchApply.getMember().getNickName()
                ,matchApply.getSchedule().getParty().getId(),matchApply.getState());
        else
            return null;
    }


}
