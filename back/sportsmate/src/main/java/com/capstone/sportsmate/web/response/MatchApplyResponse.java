package com.capstone.sportsmate.web.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MatchApplyResponse {
    private String name;
    private String title;
    private String contents;
    private Long matchApplyId;

}
