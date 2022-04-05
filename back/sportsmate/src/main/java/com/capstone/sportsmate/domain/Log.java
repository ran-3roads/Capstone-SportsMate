package com.capstone.sportsmate.domain;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "log")
@Getter
public class Log {
    private Log(){} //생성자 호출 방지

    //entity 컬럼
    @Id
    @Column(name="log_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private float score;

    @Column(name="since_date")
    LocalDate sinceDate;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public static Log createLog(float score, LocalDate sinceDate, Member member) {
        Log log = new Log();
        log.score = score;
        log.sinceDate = sinceDate;
        log.member = member;
        return log;
    }
}
