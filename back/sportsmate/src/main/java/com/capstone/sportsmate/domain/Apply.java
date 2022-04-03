package com.capstone.sportsmate.domain;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "apply")
@Getter @Setter
public class Apply { //수정 필요
    @Id
    @Column(name="apply_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Request state;

    private LocalDateTime since_date;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name="party_id")
    private Party party;




}
