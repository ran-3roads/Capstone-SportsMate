package com.capstone.sportsmate.web.response;

import com.capstone.sportsmate.domain.status.NoticeStatus;
import com.capstone.sportsmate.domain.status.NoticeType;
import com.capstone.sportsmate.domain.status.Request;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class NoticeResponse {
    private Long noticeId;
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime sinceDate;//가입날짜
    private NoticeStatus noticeStatus;
    private NoticeType noticeType;
    private String sender;//보내는이
    private Long partyId;
    private Request state;





}
