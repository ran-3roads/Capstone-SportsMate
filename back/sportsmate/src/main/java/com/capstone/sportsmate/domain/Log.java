package com.capstone.sportsmate.domain;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "log")
@Getter @Setter
public class Log {
    private Log(){}
    @Id
    @Column(name="log_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private float score;

    @Column(name="since_date")
    LocalDateTime sinceDate;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public static Log createLog(float score, LocalDateTime sinceDate, Member member) {
        Log log = new Log();
        log.setScore(score);
        log.setSinceDate(sinceDate);
        log.setMember(member);
        return log;
    }
}
