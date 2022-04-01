package com.capstone.sportsmate.domain;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

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
    @Column(name="nick_name")
    private String nickName;
    private String password;
    @Column(name="since_date")
    private Date sinceDate;
    @Column(name="birth_date")
    private Date birthDate;
    private int credit;
}
