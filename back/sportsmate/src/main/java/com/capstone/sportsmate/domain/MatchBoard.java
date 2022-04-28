package com.capstone.sportsmate.domain;

import com.capstone.sportsmate.web.MatchForm;
import com.capstone.sportsmate.web.response.MatchBoardListResponse;
import com.capstone.sportsmate.web.response.MatchBoardResponse;
import lombok.Getter;

import javax.persistence.*;

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

    private String title;

    @Column(name="current_member")
    private int currentMember;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "regist_id")
    private Regist regist;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public static MatchBoard createMatchBoard(Schedule schedule,Member member ,MatchForm matchForm) {// 용병 게시판 생성
        MatchBoard matchBoard = new MatchBoard();
        matchBoard.currentMember = schedule.getCurrentMember();
        matchBoard.title     = schedule.getTitle();
        matchBoard.maxMember = schedule.getMaxMember();
        matchBoard.credit    = schedule.getCredit();
        matchBoard.contents  = schedule.getContents();
        matchBoard.regist    = schedule.getRegist();
        matchBoard.member    = member;
        return matchBoard;
    }
    public MatchBoardListResponse toMatchBoardListResponse(){
       return new MatchBoardListResponse(member.getName(),id, title,
               regist.getStartTime(), regist.getEndTime());
    }
    public MatchBoardResponse toMatchBoardResponse(){
        return new MatchBoardResponse(member.getName(),maxMember,credit,contents,title,
                currentMember,regist.getStartTime(),regist.getEndTime(), regist.getId());
    }

    public void addCurrentMember() {
        this.currentMember++;
    }
}
