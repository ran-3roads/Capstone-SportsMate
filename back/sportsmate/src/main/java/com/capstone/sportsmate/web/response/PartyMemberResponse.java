package com.capstone.sportsmate.web.response;

import com.capstone.sportsmate.domain.status.Role;
import com.capstone.sportsmate.domain.status.Sex;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class PartyMemberResponse {
    private String nickName;
    private LocalDate birthDate;
    private Sex sex;
    private Role role;
    private LocalDate sinceDate;



}
