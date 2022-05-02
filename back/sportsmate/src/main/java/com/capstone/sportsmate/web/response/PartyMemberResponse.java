package com.capstone.sportsmate.web.response;

import com.capstone.sportsmate.domain.status.Role;
import com.capstone.sportsmate.domain.status.Sex;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class PartyMemberResponse {
    private Long memberId;
    private String nickName;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;
    private Sex sex;
    private Role role;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate sinceDate;



}
