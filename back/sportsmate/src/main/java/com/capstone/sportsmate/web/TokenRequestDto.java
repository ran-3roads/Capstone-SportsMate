package com.capstone.sportsmate.web;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TokenRequestDto { //토큰 요청을 받을 dto
    private String accessToken;
    private String refreshToken;
}