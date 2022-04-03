package com.capstone.sportsmate.domain;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "log")
@Getter @Setter
public class Log {
    @Id
    @Column(name="log_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private float score;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

}
