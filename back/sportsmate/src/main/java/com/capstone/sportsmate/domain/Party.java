package com.capstone.sportsmate.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name="party")
@Getter
public class Party {
    private Party() {} // 생성자 호출 방지

    //entity 컬럼

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="party_id")
    private Long id; //primary key

    @Enumerated(EnumType.STRING)
    @Column(name="sports_name")
    private SportsName sportName;

    private String location;//위치이름
    private String intro;//간단한 소개

    @Column(name="since_date")
    private LocalDateTime sinceDate;//가입날짜

    @Column(name="meet_count")
    private int meetCount;//미팅횟수

    @Column(columnDefinition = "TEXT")
    private String info;//정보탭

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;//방장

    // entity 생성

    public static Party createParty(SportsName sportName, String location, String intro, LocalDateTime sinceDate, int meetCount, String info, Member member) {
        Party party = new Party();
        party.sportName = sportName;
        party.location = location;
        party.intro = intro;
        party.sinceDate = sinceDate;
        party.meetCount = meetCount;
        party.info = info;
        party.member = member;
        return party;
    }



    //    @OneToMany(mappedBy = "party")
//    private List<PartyMember> partyMembers= new ArrayList<>();

    //apply 부분 몰겟다
}
