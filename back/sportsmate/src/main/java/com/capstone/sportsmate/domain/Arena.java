package com.capstone.sportsmate.domain;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name="arena")
@Getter @Setter
public class Arena {
    @Id
    @Column(name="arena_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "map_x")
    private int mapX;
    @Column(name = "map_y")
    private int mapY;
    private int credit;

    @Enumerated(EnumType.STRING)
    @Column(name="sports_name")
    private SportsName sportName;

    private String name;

    //Create test
    public static Arena createArena(int mapX,int mapY,int credit,SportsName sportName,String name) {
        Arena arena = new Arena();
        arena.mapX=mapX;
        arena.mapY=mapY;
        arena.credit=credit;
        arena.sportName=sportName;
        arena.name = name;
        return arena;
    }
}
