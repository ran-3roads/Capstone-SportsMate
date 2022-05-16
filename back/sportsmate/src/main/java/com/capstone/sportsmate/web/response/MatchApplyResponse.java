package com.capstone.sportsmate.web.response;

import com.capstone.sportsmate.domain.status.Request;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MatchApplyResponse {
    private String name;
    private String suggest;
    private Long matchApplyId;
    private Request state;
}
