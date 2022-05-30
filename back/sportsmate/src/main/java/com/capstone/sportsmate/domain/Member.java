package com.capstone.sportsmate.domain;


import com.capstone.sportsmate.domain.status.Authority;
import com.capstone.sportsmate.domain.status.Sex;
import com.capstone.sportsmate.web.MemberMoidfyForm;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import org.springframework.security.crypto.password.PasswordEncoder;

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

    @JsonIgnore//비밀번호 노출은 위험하다.
    private String password;

    @Column(name="since_date")
    private LocalDate sinceDate;

    @Column(name="birth_date")
    private LocalDate birthDate;

    @Column(name="phone_number")
    private String phoneNumber;

    @JsonIgnore
    @Enumerated(EnumType.STRING)
    private Authority authority;

    private int credit;


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
    //포인트 감소
    public void withdraw(int credit) {
        this.credit = this.credit - credit;
    }

    public void updateFindMember(MemberMoidfyForm memberMoidfyForm, PasswordEncoder passwordEncoder) {
        //s내정보 변경
        this.password = passwordEncoder.encode(memberMoidfyForm.getPassword()) ;
        this.nickName = memberMoidfyForm.getNickName();
        this.phoneNumber = memberMoidfyForm.getPhoneNumber();
    }
}