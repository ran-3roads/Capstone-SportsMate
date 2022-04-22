package com.capstone.sportsmate.web.response;


import com.capstone.sportsmate.domain.status.Category;
import com.capstone.sportsmate.domain.status.SportsName;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class PartyBoardResponse {

    private Category category;

    private String title;

    private String contents;

    private Long id;

    private String nickName;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate sinceDate;


}
