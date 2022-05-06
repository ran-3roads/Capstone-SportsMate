package com.capstone.sportsmate.web;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class BookForm {
    private int maxMember;
    private String title;
    private String contents;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate day; // 경기 시작

    private Long arenaTimeId;
}
