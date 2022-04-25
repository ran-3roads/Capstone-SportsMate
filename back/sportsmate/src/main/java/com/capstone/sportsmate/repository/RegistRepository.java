package com.capstone.sportsmate.repository;

import com.capstone.sportsmate.domain.Arena;
import com.capstone.sportsmate.domain.Party;
import com.capstone.sportsmate.domain.Schedule;
import com.capstone.sportsmate.domain.notice.Notice;
import com.capstone.sportsmate.domain.status.SportsName;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class RegistRepository {
    private final EntityManager em;

    public List<Schedule> findByParty(Party party){
        String jpql="select s from schedule s";

        //검색 조건으로 검색
        jpql += " where s.party = :party";
        TypedQuery<Schedule> query = em.createQuery(jpql, Schedule.class)
                .setMaxResults(1000); //최대 1000건
        if(party != null) {
            query = query.setParameter("party", party);
        }
        return query.getResultList();
    }
    public List<Arena> findBySportsName(SportsName sportsName){
        String jpql="select a from arena a";

        //검색 조건으로 검색
        jpql += " where a.sportsName = :sportsName";
        TypedQuery<Arena> query = em.createQuery(jpql, Arena.class)
                .setMaxResults(1000); //최대 1000건
        if(sportsName != null) {
            query = query.setParameter("sportsName", sportsName);
        }
        return query.getResultList();
    }
    public Arena findArenaOne(Long id) {
        return em.find(Arena.class, id);
    }
}
