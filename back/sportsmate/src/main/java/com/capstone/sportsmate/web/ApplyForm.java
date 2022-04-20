package com.capstone.sportsmate.web;

import com.capstone.sportsmate.domain.status.NoticeStatus;
import com.capstone.sportsmate.domain.status.NoticeType;
import com.capstone.sportsmate.domain.status.Request;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Data
public class ApplyForm {

    private String partyTitle; //파티이름

    private String memberName; // 지원자 이름
    private String memberEmail; // 지원자 이메일

    private LocalDate sinceDate; //보낸 날짜

    private Request state; // 승락, 거절 , 대기

}
