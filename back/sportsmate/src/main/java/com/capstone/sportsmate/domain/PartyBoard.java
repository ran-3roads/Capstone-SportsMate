package com.capstone.sportsmate.domain;

import com.capstone.sportsmate.domain.status.Category;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDate;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name="partyboard")
@Getter
public class PartyBoard {
    @Id
    @Column(name="party_board_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //공지 일반
    @Enumerated(EnumType.STRING)
    @Column(name="category")
    private Category category;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String contents;

    @Column(name="since_date")
    private LocalDate sinceDate;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "party_id")
    private Party party;

    //Create

    public static PartyBoard createPartyBoard(Category category, String title, String contents, LocalDate sinceDate, Member member, Party party) {
        PartyBoard partyBoard = new PartyBoard();
        partyBoard.category = category;
        partyBoard.title = title;
        partyBoard.contents = contents;
        partyBoard.sinceDate = sinceDate;
        partyBoard.member = member;
        partyBoard.party = party;
        return partyBoard;
    }
}
