package com.capstone.sportsmate.domain;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Entity
@Table(name = "member")
@Getter
public class Member {
    private Member() {} // 생성자 호출 방지

    //entity 컬럼
    @Id
    @Column(name="member_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    @Enumerated(EnumType.STRING)
    private Sex sex;

    private String email;

    @Column(name="nick_name")
    private String nickName;

    private String password;

    @Column(name="since_date")
    private LocalDateTime sinceDate;

    @Column(name="birth_date")
    private LocalDateTime birthDate;

    @Column(name="phone_number")
    private String phoneNumber;

    private int credit;

//    @OneToMany(mappedBy = "member")
//    private List<Party> parties= new ArrayList<>();
//
//    @OneToMany(mappedBy = "member")
//    private List<PartyMember> partyMembers= new ArrayList<>();
//
//    @OneToMany(mappedBy = "member")
//    private List<Log> logs= new ArrayList<>();



    //apply 부분 몰겟다



    // entity 생성

    public static Member createMember(String name, Sex sex, String email, String nickName, String password, LocalDateTime sinceDate, LocalDateTime birthDate, String phoneNumber, int credit) {
        Member member = new Member();
        member.name = name;
        member.sex = sex;
        member.email = email;
        member.nickName = nickName;
        member.password = password;
        member.sinceDate = sinceDate;
        member.birthDate = birthDate;
        member.phoneNumber = phoneNumber;
        member.credit = credit;
        return member;
    }
}
