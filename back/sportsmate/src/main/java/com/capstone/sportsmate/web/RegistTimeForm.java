package com.capstone.sportsmate.web;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class RegistTimeForm {

    private Long arenaId;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate day; // 경기 시작

}
