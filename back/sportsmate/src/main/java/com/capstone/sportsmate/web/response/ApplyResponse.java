package com.capstone.sportsmate.web.response;

import com.capstone.sportsmate.domain.status.NoticeStatus;
import com.capstone.sportsmate.domain.status.NoticeType;
import com.capstone.sportsmate.domain.status.Request;
import com.capstone.sportsmate.domain.status.Sex;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ApplyResponse {

    private Long id; //지원서id
    private String partyTitle; //파티이름

    private String memberName; // 지원자 이름
    private String memberEmail; // 지원자 이메일

    private LocalDateTime sinceDate; //보낸 날짜
    private Sex sex;

    private Request state; // 승락, 거절 , 대기
    private String contents; // 지원서 내용

}
