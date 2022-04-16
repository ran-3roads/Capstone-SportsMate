package com.capstone.sportsmate.web.response;

import com.capstone.sportsmate.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
//response 객체
public class MemberResponse {
    private String email;

    public static MemberResponse of(Member member) {
        return new MemberResponse(member.getEmail());
    }
}