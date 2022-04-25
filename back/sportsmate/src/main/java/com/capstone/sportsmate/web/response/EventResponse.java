package com.capstone.sportsmate.web.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class EventResponse {

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private String title;

    private Long scheduleId; // 해당 스케쥴들의 id, hidden 으로 표시해야함.
}
