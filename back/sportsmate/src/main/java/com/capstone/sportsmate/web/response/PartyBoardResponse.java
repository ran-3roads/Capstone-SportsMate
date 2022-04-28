package com.capstone.sportsmate.web.response;


import com.capstone.sportsmate.domain.status.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class PartyBoardResponse {

    private Category category;

    private String title;

    private String contents;

    private Long id;

    private String nickName;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime sinceDate;


}
