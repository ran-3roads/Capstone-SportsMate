package com.capstone.sportsmate.web;


import com.capstone.sportsmate.domain.status.SportsName;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PartyForm {

    private SportsName sportsName;
    private String location;
    private String intro;
    private String title;
    private String info;

}
