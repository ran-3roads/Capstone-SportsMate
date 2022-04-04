package com.capstone.sportsmate.domain;

import lombok.Getter;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "joingame")
@Getter
public class JoinGame {
    private JoinGame(){} // 생성자 호출 방지
    //entity 컬럼

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="join_game_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "regist_id")
    private Regist regist;

    // entity 생성


    public static JoinGame createJoinGame(Member member, Regist regist) {
        JoinGame joinGame = new JoinGame();
        joinGame.member = member;
        joinGame.regist = regist;
        return joinGame;
    }
}
