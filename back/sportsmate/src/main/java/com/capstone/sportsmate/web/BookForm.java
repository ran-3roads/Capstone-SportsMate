package com.capstone.sportsmate.web;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BookForm {
    @JsonProperty("maxMember")
    private int maxMember;
    @JsonProperty("title")
    private String title;
    @JsonProperty("contents")
    private String contents;

    @JsonProperty("day")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate day; // 경기 시작

    @JsonProperty("arenaTimeId")
    private Long arenaTimeId;
}
