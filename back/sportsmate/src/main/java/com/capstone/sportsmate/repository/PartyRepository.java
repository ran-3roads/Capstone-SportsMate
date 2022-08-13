package com.capstone.sportsmate.repository;


import com.capstone.sportsmate.domain.Member;
import com.capstone.sportsmate.domain.Party;
import com.capstone.sportsmate.domain.status.SportsName;
import com.capstone.sportsmate.web.PartySearch;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;
import java.util.List;
import java.util.Optional;

@Repository
public interface PartyRepository extends JpaRepository<Party, Long> {
    @Query("select p from Party p where p.title=:title")
    Optional<Party> findByTitle(@Param("title") String title);

    @Query("select p from Party p"
    +" left join PartyMember s on p = s.party where s.member = :member")
    List<Party> findByMember(@Param("member") Member member);

    @Query("select p from Party p"+
            " where p.location = :location"+
            " and p.sportsName = :sportsName"
    )
    List<Party> SearchParties(@Param("location") String location,@Param("sportsName") SportsName sportsName);

}

