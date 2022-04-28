package com.capstone.sportsmate.domain;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "regist")
@Getter
public class Regist {
    private Regist(){} // 생성자 호출 방지
    //entity 컬럼
    @Id
    @Column(name="regist_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="start_time")
    private LocalDateTime startTime;

    @Column(name="end_time")
    private LocalDateTime endTime;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "arena_id")
    private Arena arena;

    // entity 생성

    public static Regist createRegist(LocalDateTime startTime, LocalDateTime endTime, Arena arena) {
        Regist regist = new Regist();
        regist.startTime = startTime;
        regist.endTime = endTime;
        regist.arena = arena;
        return regist;
    }
}
