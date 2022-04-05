package com.capstone.sportsmate.domain;

import lombok.Getter;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name="vote")
@Getter
public class Vote {
    @Id
    @Column(name="vote_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int contents1;

    private int contents2;

    private int contents3;

    private int contents4;

    private int contents5;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "party_board_id")
    private PartyBoard partyBoard;

    //Create


    public static Vote createVote(int content1, int content2, int content3, int content4, int content5, PartyBoard partyBoard) {
        Vote vote = new Vote();
        vote.contents1 = content1;
        vote.contents2 = content2;
        vote.contents3 = content3;
        vote.contents4 = content4;
        vote.contents5 = content5;
        vote.partyBoard = partyBoard;
        return vote;
    }
}
