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
@Getter @Setter
public class Member {
    private Member() {}
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

//    @OneToMany(mappedBy = "member")
//    private List<Party> parties= new ArrayList<>();
//
//    @OneToMany(mappedBy = "member")
//    private List<PartyMember> partyMembers= new ArrayList<>();
//
//    @OneToMany(mappedBy = "member")
//    private List<Log> logs= new ArrayList<>();



    //apply 부분 몰겟다
    private int credit;

    //
    public static Member createMember(String name, Sex sex, String email, String nickName, String password, LocalDateTime sinceDate, LocalDateTime birthDate, int credit) {
        Member member = new Member();
        member.setName(name);
        member.setNickName(nickName);
        member.setBirthDate(birthDate);
        member.setPassword(password);
        member.setSex(sex);
        member.setEmail(email);
        member.setSinceDate(sinceDate);
        member.setCredit(credit);
        return member;
    }

}
