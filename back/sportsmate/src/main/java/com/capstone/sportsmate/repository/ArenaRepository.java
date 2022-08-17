package com.capstone.sportsmate.repository;

import com.capstone.sportsmate.domain.Arena;
import com.capstone.sportsmate.domain.status.SportsName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArenaRepository extends JpaRepository<Arena,Long> {
    List<Arena> findBySportsName(SportsName sportsName);
}
