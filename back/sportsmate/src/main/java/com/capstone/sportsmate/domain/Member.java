package com.capstone.sportsmate.domain;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "member")
@Getter @Setter
public class Member {
    @Id
    @Column(name="member_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String sex;
    private String email;

    @Column(name="nick_name")
    private String nickName;

    private String password;

    @Column(name="since_date")
    private Date sinceDate;

    @Column(name="birth_date")
    private Date birthDate;

    @OneToMany(mappedBy = "member")
    private List<Party> parties= new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<PartyMember> partyMembers= new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Log> logs= new ArrayList<>();


    //apply 부분 몰겟다

    private int credit;
}
