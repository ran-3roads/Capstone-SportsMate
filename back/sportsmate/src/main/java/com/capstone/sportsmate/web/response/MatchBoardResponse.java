package com.capstone.sportsmate.web.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

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
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime startTime; // 경기 시작
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime endTime; // 경기끝
    private Long registId; //경기를 조회하기 위해 보내야됨



}
