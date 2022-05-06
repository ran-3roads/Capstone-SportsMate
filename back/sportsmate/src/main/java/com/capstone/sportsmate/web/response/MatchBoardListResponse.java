package com.capstone.sportsmate.web.response;

import com.capstone.sportsmate.domain.status.SportsName;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class MatchBoardListResponse {
    //매치보드 조회할때 보이는 모든 response
    private String name;//작성자
    private Long matchBoardId; // 매치 Id
    private String title;// 타이틀
    private SportsName sportsName;//종목
    private String location;//위치

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate day;

    private String time;

}
