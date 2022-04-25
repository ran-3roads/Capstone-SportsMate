package com.capstone.sportsmate.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name="schedule")
@Getter
public class Schedule {
    @Id
    @Column(name="schedule_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int credit;

    @Column(name="min_member")
    private int minMember;
    @Column(name = "max_member")
    private int maxMember;

    @Column(columnDefinition = "TEXT")
    private String contents;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "regist_id")
    private Regist regist;

    @JsonIgnore
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="party_id")
    private Party party;



    //Create


    public static Schedule createSchedule(int credit, int minMember, int maxMember, String contents, Regist regist,Party party) {
        Schedule schedule = new Schedule();
        schedule.credit = credit;
        schedule.minMember = minMember;
        schedule.maxMember = maxMember;
        schedule.contents = contents;
        schedule.regist = regist;
        schedule.party=party;
        return schedule;
    }
}
