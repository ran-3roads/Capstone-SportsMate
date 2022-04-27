package com.capstone.sportsmate.web.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class MatchBoardListResponse {
    //매치보드 조회할때 보이는 모든 response
    private String name;//작성자
    private Long matchBoardId; // 매치 Id
    private String title;// 타이틀
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime startTime; // 경기 시작

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime endTime; // 경기끝

}
