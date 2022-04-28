package com.capstone.sportsmate.web;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class BookForm {
    private int maxMember;
    private String title;
    private String contents;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime startTime; // 경기 시작

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime endTime; // 경기끝
}
