package com.capstone.sportsmate.web.response;


import com.capstone.sportsmate.domain.status.SportsName;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Getter
@Setter
@AllArgsConstructor
public class ArenaResponse {
    private Long arenaId;

    private float mapX;

    private float mapY;

    private SportsName sportsName;

    private String name;

    private String location;
}
