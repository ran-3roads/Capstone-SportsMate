package com.capstone.sportsmate.web;


import com.capstone.sportsmate.domain.status.Category;
import lombok.Getter;


@Getter
public class PartyBoardForm {

    private Long id;

    private Category category;

    private String title;

    private String contents;


}
