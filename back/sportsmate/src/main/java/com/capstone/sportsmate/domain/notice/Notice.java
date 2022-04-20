package com.capstone.sportsmate.domain.notice;

import com.capstone.sportsmate.domain.Apply;
import com.capstone.sportsmate.domain.Member;
import com.capstone.sportsmate.domain.Party;
import com.capstone.sportsmate.domain.status.NoticeStatus;
import com.capstone.sportsmate.domain.status.NoticeType;
import com.capstone.sportsmate.domain.status.Request;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import java.time.LocalDate;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "notice")
@Getter@Setter
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public class Notice {
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
    private LocalDate sinceDate;//가입날짜

    @JsonIgnore
    @OneToOne(fetch = LAZY)
    @JoinColumn(name="apply_id")
    private Apply apply;


    public static Notice createNotice(Member member,NoticeType noticeType, NoticeStatus noticeStatus, LocalDate sinceDate) {
        Notice notice = new Notice();
        notice.member=member;
        notice.noticeType=noticeType;
        notice.noticeStatus=noticeStatus;
        notice.sinceDate=sinceDate;
        return notice;
    }}
