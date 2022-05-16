package com.capstone.sportsmate.domain;


import com.capstone.sportsmate.domain.status.SportsName;
import com.capstone.sportsmate.web.response.ArenaResponse;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name="arena")
@Getter @Setter
public class Arena {
    @Id
    @Column(name="arena_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(name = "map_x")
    private float mapX;
    @Column(name = "map_y")
    private float mapY;

    @Enumerated(EnumType.STRING)
    @Column(name="sports_name")
    private SportsName sportsName;

    private String name;

    private String location;

    //Create test
    public static Arena createArena(float mapX,float mapY,SportsName sportsName,String name,String location) {
        Arena arena = new Arena();
        arena.mapX=mapX;
        arena.mapY=mapY;
        arena.sportsName=sportsName;
        arena.name = name;
        arena.location=location;
        return arena;
    }

}
