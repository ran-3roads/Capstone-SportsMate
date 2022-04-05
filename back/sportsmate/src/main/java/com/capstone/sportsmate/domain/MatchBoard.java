package com.capstone.sportsmate.domain;

import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "matchboard")
@Getter
public class MatchBoard {

    //entity 컬럼
    @Id
    @Column(name="match_board_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="max_member")
    private int maxMember;

    private int credit;

    @Column(columnDefinition = "TEXT")
    private String contents;

    @Enumerated(EnumType.STRING)
    private Category category;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "regist_id")
    private Regist regist;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public static MatchBoard createMatchBoard(int maxMember, int credit, String contents, Category category, Regist regist, Member member) {
        MatchBoard matchBoard = new MatchBoard();
        matchBoard.maxMember = maxMember;
        matchBoard.credit = credit;
        matchBoard.contents = contents;
        matchBoard.category = category;
        matchBoard.regist = regist;
        matchBoard.member = member;
        return matchBoard;
    }
}
