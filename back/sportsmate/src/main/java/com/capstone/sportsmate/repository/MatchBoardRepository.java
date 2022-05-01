package com.capstone.sportsmate.repository;

import com.capstone.sportsmate.domain.MatchBoard;
import com.capstone.sportsmate.domain.Regist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MatchBoardRepository extends JpaRepository<MatchBoard,Long> {
    public Optional<MatchBoard> findByRegist(Regist regist);

}
