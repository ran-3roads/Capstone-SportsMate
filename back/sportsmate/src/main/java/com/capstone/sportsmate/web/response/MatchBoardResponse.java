package com.capstone.sportsmate.web.response;

import com.capstone.sportsmate.domain.status.SportsName;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class MatchBoardResponse {
    //매치보드 단일로 조회했을때
    private String name;
    private int maxMember;
    private int credit;
    private String contents;
    private String title;
    private int currentMember;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate day;


    private String time;
    private Long registId; //경기를 조회하기 위해 보내야됨
    private SportsName sportsName;//종목
    private String location;//위치

    private float mapX;
    private float mapY;


}
