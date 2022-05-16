package com.capstone.sportsmate.web;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MatchApplyForm {//용병 신청서 폼
    private String suggest;//컨텐츠
    private Long registId;//등록된 경기 id 매치보드 단일 조회할때 registId를 보내므로 보낼수있음

}
