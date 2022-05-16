package com.capstone.sportsmate.domain;

import com.capstone.sportsmate.web.response.ArenaResponse;
import com.capstone.sportsmate.web.response.MyGameResponse;
import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import static javax.persistence.FetchType.EAGER;
import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name="arenatime")
@Getter
@Setter
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
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


}
