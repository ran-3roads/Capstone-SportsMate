package com.capstone.sportsmate.web.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ScheduleResponse {

    private String title; // 모임 이름

    private String arenaName; // 경기장 이름

    private int credit; // 경기장 인당 비용

    private int currentMember; // 현재 인원

    private int maxMember; // 목표 인원

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime startTime; // 경기 시작

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime endTime; // 경기끝

}
