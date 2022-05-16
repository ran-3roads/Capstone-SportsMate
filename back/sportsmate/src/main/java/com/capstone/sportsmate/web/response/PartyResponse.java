package com.capstone.sportsmate.web.response;

import com.capstone.sportsmate.domain.status.SportsName;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class PartyResponse {
    private Long id; //primary key

    @Enumerated(EnumType.STRING)
    private SportsName sportsName;

    private String location;//위치이름
    private String intro;//간단한 소개
    private String title;

    private String manager; // 파티장

    private LocalDate sinceDate;//가입날짜

    private int currentMember;//현재 인원

    @Column(columnDefinition = "TEXT")
    private String info;//정보탭
}
