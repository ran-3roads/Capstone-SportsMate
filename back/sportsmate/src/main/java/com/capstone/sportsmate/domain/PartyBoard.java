package com.capstone.sportsmate.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name="partyboard")
@Getter
@Setter
public class PartyBoard {
    @Id
    @Column(name="party_board_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //공지 일반

    private String title;
    private LocalDateTime since_date;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "party_id")
    private Party party;

}
