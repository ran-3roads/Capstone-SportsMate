package com.capstone.sportsmate.repository;

import com.capstone.sportsmate.domain.MatchApply;
import com.capstone.sportsmate.domain.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchApplyRepository extends JpaRepository<MatchApply,Long> {
    public List<MatchApply> findBySchedule(Schedule schedule);
}
