package com.capstone.sportsmate.web.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class EventResponse {

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate day;

    private String time;

    private String title;

    private Long scheduleId; // 해당 스케쥴들의 id, hidden 으로 표시해야함.

    private String location;
}
