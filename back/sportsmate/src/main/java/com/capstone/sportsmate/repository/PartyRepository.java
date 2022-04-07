package com.capstone.sportsmate.repository;


import com.capstone.sportsmate.domain.Member;
import com.capstone.sportsmate.domain.Party;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;

@Repository
@RequiredArgsConstructor
public class PartyRepository {
    private final EntityManager em;

    public Long save(Party party) {
        em.persist(party);
        return party.getId();
    }

    public Party findByTitle(String title){
        Party party;
        try {
            party = em.createQuery("select p from Party p where p.title=:email", Party.class)
                    .setParameter("title", title).getSingleResult();
        } catch(NoResultException e){
            return null;
        }
        return party;
    }
}
