package com.capstone.sportsmate.repository;

import com.capstone.sportsmate.domain.Arena;
import com.capstone.sportsmate.domain.ArenaTime;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArenaTimeRepository extends JpaRepository<ArenaTime,Long> {
    public List<ArenaTime> findByArena(Arena arena);
}
