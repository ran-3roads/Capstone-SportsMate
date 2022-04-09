package com.capstone.sportsmate.repository;


import com.capstone.sportsmate.domain.Member;
import com.capstone.sportsmate.domain.SportsName;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PartySearch {
    private Member member;
    private SportsName sportsName;
}
