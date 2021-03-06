package com.capstone.sportsmate.web.response;

import com.capstone.sportsmate.domain.status.Request;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter@Setter
public class ReplyResponse {

    private String partyTitle; //파티이름
    private Request request; // 승락, 거절
    private LocalDateTime sinceDate; //보낸 날짜
}
