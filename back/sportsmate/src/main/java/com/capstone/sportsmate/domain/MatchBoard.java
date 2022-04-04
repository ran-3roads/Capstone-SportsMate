package com.capstone.sportsmate.domain;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "matchboard")
@Getter
public class MatchBoard {
    private MatchBoard() {} // 생성자 호출 방지
    @Id
    @Column(name="apply_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="max_member")
    private int maxMember;

    private int credit;

    @Column(columnDefinition = "TEXT")
    private String contents;

    @Enumerated(EnumType.STRING)
    private Category category;


}
