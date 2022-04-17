package com.capstone.sportsmate.web;


import com.capstone.sportsmate.domain.Member;
import com.capstone.sportsmate.domain.status.SportsName;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PartySearch {
    private SportsName sportsName;
    private String location;
}
