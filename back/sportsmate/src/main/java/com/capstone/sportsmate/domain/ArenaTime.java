package com.capstone.sportsmate.domain;

import com.capstone.sportsmate.web.response.ArenaResponse;
import com.capstone.sportsmate.web.response.MyGameResponse;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name="arenatime")
@Getter
@Setter
public class ArenaTime {

    @Id
    @Column(name="arena_time_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private  String time;

    private int credit;

    @JsonIgnore
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "arena_id")
    private Arena arena;

    public boolean equals(Regist regist) {
       Long registGetArenaTimeId=regist.getArenaTime().getId();
        if (this.id == registGetArenaTimeId) {
            return true;
        }
        return false;
    }
}
