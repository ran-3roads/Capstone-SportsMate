package com.capstone.sportsmate.repository;

import com.capstone.sportsmate.domain.*;
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

    public Long save(Regist regist) {
        em.persist(regist);
        return regist.getId();
    }

//    public List<Schedule> findByParty(Party party){ // 그대로
//        String jpql="select s from Schedule s";
//
//        //검색 조건으로 검색
//        jpql += " where s.party = :party";
//        TypedQuery<Schedule> query = em.createQuery(jpql, Schedule.class)
//                .setMaxResults(1000); //최대 1000건
//        if(party != null) {
//            query = query.setParameter("party", party);
//        }
//        return query.getResultList();
//    }
//    public JoinGame findByMemberAndRegist(Member member, Regist regist){
//        JoinGame joinGame;
//        try {
//            joinGame = em.createQuery("select j from JoinGame j where j.member=:member and j.regist=:regist", JoinGame.class)
//                    .setParameter("member",member)
//                    .setParameter("regist",regist)
//                    .getSingleResult();
//        } catch(NoResultException e){
//            return null;
//        }
//        return joinGame;
//    }
//    public List<Arena> findBySportsName(SportsName sportsName){
//        String jpql="select a from Arena a";
//
//        //검색 조건으로 검색
//        jpql += " where a.sportsName = :sportsName";
//        TypedQuery<Arena> query = em.createQuery(jpql, Arena.class)
//                .setMaxResults(1000); //최대 1000건
//        if(sportsName != null) {
//            query = query.setParameter("sportsName", sportsName);
//        }
//        return query.getResultList();
//    }
//    public List<ArenaTime> findByArena(Arena arena){
//        String jpql="select a from ArenaTime a";
//
//        //검색 조건으로 검색
//        jpql += " where a.arena = :arena";
//        TypedQuery<ArenaTime> query = em.createQuery(jpql, ArenaTime.class)
//                .setMaxResults(1000); //최대 1000건
//        if(arena != null) {
//            query = query.setParameter("arena", arena);
//        }
//        return query.getResultList();
//    }
//    public ArenaTime findById(Long arenaTimeId){
//        return em.find(ArenaTime.class, arenaTimeId);
//    }


//    public Arena findById(Long id) {
//        return em.find(Arena.class, id);
//    }
    public Regist findById(Long id) {
        return em.find(Regist.class, id);
    }


    public List<Regist> findByArena(Arena arena){
        String jpql="select r from Regist r";

        //검색 조건으로 검색
        jpql += " where r.arena = :arena";
        TypedQuery<Regist> query = em.createQuery(jpql, Regist.class)
                .setMaxResults(1000); //최대 1000건
        if(arena != null) {
            query = query.setParameter("arena", arena);
        }
        return query.getResultList();
    }

}
