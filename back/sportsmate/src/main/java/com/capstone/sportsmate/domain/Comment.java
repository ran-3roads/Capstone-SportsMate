package com.capstone.sportsmate.domain;


import com.capstone.sportsmate.web.response.CommentResponse;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name="comment")
@Getter @Setter
public class Comment {
    @Id
    @Column(name="comment_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String contents;

    @Column(name="since_date")
    private LocalDate sinceDate;

    @JsonIgnore
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @JsonIgnore
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "party_board_id")
    private PartyBoard partyBoard;

    public static Comment createComment(String contents, LocalDate sinceDate, Member member, PartyBoard partyBoard) {
        Comment comment = new Comment();
        comment.contents = contents;
        comment.sinceDate=sinceDate;
        comment.partyBoard=partyBoard;
        comment.member = member;
        return comment;
    }

    public void updateComment(String contents,LocalDate sinceDate) {
        this.contents = contents;
        this.sinceDate = sinceDate;
    }
    public CommentResponse toCommentResponse(){
        CommentResponse commentResponse = new CommentResponse(this.id,this.member.getNickName()
                , this.contents,this.sinceDate);
        return commentResponse;
    }
}
