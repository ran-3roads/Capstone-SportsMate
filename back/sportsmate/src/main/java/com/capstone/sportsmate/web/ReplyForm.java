package com.capstone.sportsmate.web;

import com.capstone.sportsmate.domain.status.Request;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter@Setter
public class ReplyForm {

    private String partyTitle; //파티이름
    private Request request; // 승락, 거절
    private LocalDate sinceDate; //보낸 날짜
}
