package com.capstone.sportsmate.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "regist")
@Getter
public class Regist {
    //entity 컬럼
    @Id
    @Column(name="regist_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="day")
    private LocalDate day;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name="arena_time_id") // 시간
    private ArenaTime arenaTime;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "arena_id")
    private Arena arena;

    // entity 생성

    public static Regist createRegist(LocalDate day, ArenaTime arenaTime, Arena arena) {
        Regist regist = new Regist();
        regist.day = day;
        regist.arenaTime = arenaTime;
        regist.arena = arena;
        return regist;
    }
}
