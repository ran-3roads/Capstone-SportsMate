package com.capstone.sportsmate.web.response;

import com.capstone.sportsmate.domain.status.SportsName;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class MyGameResponse {
    private Long regist_id;
    private SportsName sportsName;//종목
    private String location;//위치

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate day;

    private String time;

}
