package com.capstone.sportsmate.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name="vote")
@Getter @Setter
public class Vote {
    @Id
    @Column(name="vote_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int content1;
    private int content2;
    private int content3;
    private int content4;
    private int content5;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "party_board_id")
    private PartyBoard partyBoard;

    //Create
}
