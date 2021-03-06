package com.capstone.sportsmate.web.response;

import com.capstone.sportsmate.domain.status.SportsName;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ScheduleResponse {

    private String title; // 모임 이름

    private String arenaName; // 경기장 이름

    private int credit; // 경기장 인당 비용

    private int currentMember; // 현재 인원

    private int maxMember; // 목표 인원

    private double nShotCredit; // 비용에서  목표인원을 나눈값

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate day; // 경기 날짜

    private String time; // 경기 타임

    private float mapX;
    private float mapY;

    private SportsName sportsName;
    private String location;

}
