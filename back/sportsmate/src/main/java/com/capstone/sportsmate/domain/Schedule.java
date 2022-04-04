package com.capstone.sportsmate.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name="schedule")
@Getter @Setter
public class Schedule {
    @Id
    @Column(name="schedule_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int credit;

    private int minMember;
    private int maxMember;

    private String contents;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "regist_id")
    private Regist regist;

    //Create

}
