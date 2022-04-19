package com.capstone.sportsmate.domain.notice;

import com.capstone.sportsmate.domain.Apply;
import com.capstone.sportsmate.domain.Member;
import com.capstone.sportsmate.domain.Party;
import com.capstone.sportsmate.domain.status.NoticeStatus;
import com.capstone.sportsmate.domain.status.Request;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import java.time.LocalDate;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "notice")
@Getter
@DiscriminatorColumn(name = "DTYPE")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class Notice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="notice_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Enumerated(EnumType.STRING)
    @Column(name="notice_status")
    private NoticeStatus noticeStatus;

    @Column(name="since_date")
    private LocalDate sinceDate;//가입날짜

    @OneToOne(fetch = LAZY)
    @JoinColumn(name="apply_id")
    private Apply apply;


    public static Notice createNotice(Member member, NoticeStatus noticeStatus, LocalDate sinceDate,Apply apply) {
        Notice notice = new Notice();
        notice.member=member;
        notice.noticeStatus=noticeStatus;
        notice.sinceDate=sinceDate;
        notice.apply=apply;
        return notice;
    }
}