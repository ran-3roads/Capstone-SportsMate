package com.capstone.sportsmate.repository;

import com.capstone.sportsmate.domain.Member;
import com.capstone.sportsmate.domain.Party;
import com.capstone.sportsmate.domain.PartyMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PartyMemberRepository extends JpaRepository<PartyMember,Long> {
    List<PartyMember> findByParty(Party party);
    Optional<PartyMember> findOneById(Long id);
    void deleteByPartyAndMember(Party party, Member member);
}
