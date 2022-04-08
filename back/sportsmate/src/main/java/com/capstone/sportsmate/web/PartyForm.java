package com.capstone.sportsmate.web;


import com.capstone.sportsmate.domain.SportsName;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@Setter
public class PartyForm {
    private SportsName sportsName;
    private String location;
    private String intro;
    private String title;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate sinceDate;

    private int meetCount;
    private String info;
}
