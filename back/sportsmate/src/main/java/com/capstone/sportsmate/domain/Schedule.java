package com.capstone.sportsmate.domain;

import com.capstone.sportsmate.web.response.EventResponse;
import com.capstone.sportsmate.web.response.ScheduleResponse;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;

import javax.persistence.*;

import static javax.persistence.FetchType.EAGER;
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

    @Column(name="current_member")
    private int currentMember;
    @Column(name = "max_member")
    private int maxMember;

    @Column(name="title")
    private String title;

    @Column(columnDefinition = "TEXT")
    private String contents;

    @JsonIgnore
    @OneToOne(fetch = EAGER)
    @JoinColumn(name = "regist_id")
    private Regist regist;

    @JsonIgnore
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="party_id")
    private Party party;



    //Create


    public static Schedule createSchedule(int credit, int currentMember, int maxMember,String title, String contents, Regist regist,Party party) {
        Schedule schedule = new Schedule();
        schedule.credit = credit;
        schedule.currentMember = currentMember;
        schedule.maxMember = maxMember;
        schedule.title=title;
        schedule.contents = contents;
        schedule.regist = regist;
        schedule.party=party;
        return schedule;
    }
    public void addCurrentMemeber(){
        this.currentMember++;
    }
    public EventResponse toEventResponse(){
        EventResponse eventResponse = new EventResponse(this.regist.getDay(),this.regist.getArenaTime().getTime(),this.title,this.id,this.regist.getArena().getLocation());
        return eventResponse;
    }
    public ScheduleResponse toScheduleResponse(){
        double nShot=(double)this.credit/this.maxMember;
        ScheduleResponse scheduleResponse =new  ScheduleResponse(this.title,this.regist.getArena().getName(),this.credit,this.currentMember,this.maxMember,nShot,this.regist.getDay(),this.regist.getArenaTime().getTime(),this.regist.getArena().getMapX(),this.regist.getArena().getMapY(),this.regist.getArena().getSportsName(),this.regist.getArena().getLocation());
        return scheduleResponse;
    }

    public boolean isMaxMember() {
        if(maxMember==currentMember)
            return true;
        return false;
    }
}
