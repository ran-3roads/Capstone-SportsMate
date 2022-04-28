package com.capstone.sportsmate.domain;

import com.capstone.sportsmate.domain.status.Category;
import com.capstone.sportsmate.web.response.PartyBoardResponse;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

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
    private LocalDateTime sinceDate;

    @JsonIgnore //controller가 리턴할때 제외함 해야지 현재또는 오류에서 벗어남
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @JsonIgnore
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "party_id")
    private Party party;

    //Create

    public static PartyBoard createPartyBoard(Category category, String title, String contents, LocalDateTime sinceDate, Member member, Party party) {
        PartyBoard partyBoard = new PartyBoard();
        partyBoard.category = category;
        partyBoard.title = title;
        partyBoard.contents = contents;
        partyBoard.sinceDate = sinceDate;
        partyBoard.member = member;
        partyBoard.party = party;
        return partyBoard;
    }
    public void updatePartyBoard(Category category,String title, String contents,LocalDateTime sinceDate){
       this.category = category;
       this.title = title;
       this.contents = contents;
       this.sinceDate = sinceDate;
    }
    public PartyBoardResponse toPartyBoardResponse(){
        PartyBoardResponse partyBoardResponse = new PartyBoardResponse(this.category,this.title,
                this.contents,this.id,this.member.getNickName(),this.sinceDate);
        return partyBoardResponse;
    }
}
