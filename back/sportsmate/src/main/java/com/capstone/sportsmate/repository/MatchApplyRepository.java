package com.capstone.sportsmate.repository;

import com.capstone.sportsmate.domain.Member;
import com.capstone.sportsmate.domain.Party;
import com.capstone.sportsmate.domain.notice.MatchApply;
import com.capstone.sportsmate.domain.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchApplyRepository extends JpaRepository<MatchApply,Long> {
    List<MatchApply> findBySchedule(Schedule schedule);
    Boolean existsByMemberAndSchedule(Member member,Schedule schedule);

}
