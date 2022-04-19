package com.capstone.sportsmate.repository;

import com.capstone.sportsmate.domain.Party;
import com.capstone.sportsmate.domain.PartyBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PartyBoardRepository extends JpaRepository<PartyBoard, Long> {
    Optional<PartyBoard> findById(Long id);
    List<PartyBoard> findByParty(Party party);
}
