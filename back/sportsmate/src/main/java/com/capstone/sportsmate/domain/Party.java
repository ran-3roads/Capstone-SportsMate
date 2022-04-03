package com.capstone.sportsmate.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name="party")
@Getter @Setter
public class Party {

    @Id @GeneratedValue
    @Column(name="party_id")
    private Long id;

    private String sportName;

    private String location;
    private String intro;
    private Date since_date;
    private int meetCount;
    private String info;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "party")
    private List<PartyMember> partyMembers= new ArrayList<>();

    //apply 부분 몰겟다
}
