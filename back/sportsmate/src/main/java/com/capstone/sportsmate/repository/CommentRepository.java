package com.capstone.sportsmate.repository;

import com.capstone.sportsmate.domain.Comment;
import com.capstone.sportsmate.domain.PartyBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Long> {
    List<Comment> findByPartyBoard(PartyBoard partyBoard);
    Optional<Comment> findById(Long Id);
}
