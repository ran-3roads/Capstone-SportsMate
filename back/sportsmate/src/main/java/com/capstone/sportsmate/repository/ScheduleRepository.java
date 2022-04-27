package com.capstone.sportsmate.repository;

import com.capstone.sportsmate.domain.Regist;
import com.capstone.sportsmate.domain.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule,Long> {
    public Optional<Schedule> findByRegist(Regist regist);
}
