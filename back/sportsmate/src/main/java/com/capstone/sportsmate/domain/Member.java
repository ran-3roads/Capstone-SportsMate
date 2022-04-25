package com.capstone.sportsmate.domain;


import com.capstone.sportsmate.domain.status.Authority;
import com.capstone.sportsmate.domain.status.Sex;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDate;


@Entity
@Table(name = "member")
@Getter
public class Member {

    //entity 컬럼
    @Id
    @JsonIgnore//정보교환할때 이항목은 제외됨 중요정보기에 제외함 일단 테스트 사마 넣어두고 정삭작동하면 다른 중요정보도 그렇게 적용할 예정
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
    private LocalDate sinceDate;

    @Column(name="birth_date")
    private LocalDate birthDate;

    @Column(name="phone_number")
    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    private Authority authority;

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
    public static Member createMember(String name, Sex sex, String email, String nickName, String password, LocalDate
            sinceDate, LocalDate birthDate, String phoneNumber,Authority authority) {
        Member member = new Member();
        member.name = name;
        member.sex = sex;
        member.email = email;
        member.nickName = nickName;
        member.password = password;
        member.sinceDate = sinceDate;
        member.birthDate = birthDate;
        member.phoneNumber = phoneNumber;
        member.authority = authority;
        return member;
    }
    //포인트 충전
    public void deposit(int credit){
        this.credit = this.credit + credit;
    }
}
