package com.capstone.sportsmate.domain;


import com.capstone.sportsmate.domain.status.SportsName;
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

    private int credit;

    @Enumerated(EnumType.STRING)
    @Column(name="sports_name")
    private SportsName sportsName;

    private String name;

    //Create test
    public static Arena createArena(float mapX,float mapY,int credit,SportsName sportsName,String name) {
        Arena arena = new Arena();
        arena.mapX=mapX;
        arena.mapY=mapY;
        arena.credit=credit;
        arena.sportsName=sportsName;
        arena.name = name;
        return arena;
    }
}
