package com.capstone.sportsmate.repository;

import com.capstone.sportsmate.domain.JoinGame;
import com.capstone.sportsmate.domain.Member;
import com.capstone.sportsmate.domain.Regist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JoinGameRepository extends JpaRepository<JoinGame,Long> {
    List<JoinGame> findByMember(Member member);
    List<JoinGame> findByRegist(Regist regist);
    void deleteById(Long id);
}
