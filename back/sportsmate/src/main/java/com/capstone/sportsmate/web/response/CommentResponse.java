package com.capstone.sportsmate.web.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class CommentResponse {
    private Long id;
    private String nickName;
    private String contents;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate sinceDate;
}
