package com.capstone.sportsmate.repository;


import com.capstone.sportsmate.domain.Member;
import com.capstone.sportsmate.domain.Party;
import com.capstone.sportsmate.domain.PartyMember;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;
import java.util.List;

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
            party = em.createQuery("select p from Party p where p.title=:title", Party.class)
                    .setParameter("title", title).getSingleResult();
        } catch(NoResultException e){
            return null;
        }
        return party;
    }
    public Long mkPartyMember(PartyMember partyMember){
        em.persist(partyMember);
        return partyMember.getId();
    }
    public List<Party> findAllString(PartySearch partySearch){
        String jpql="select p from Party p join PartyMember s";
        boolean isFirstCondition= true;

        //멤버의 이름으로 등록된 파티 찾기
        if(partySearch.getMember()!=null){
            if (isFirstCondition) {
                jpql += " where";
                isFirstCondition = false;
            } else {
                jpql += " and";
            }
            jpql += " s.member = :member";
        }

        TypedQuery<Party> query = em.createQuery(jpql, Party.class)
                .setMaxResults(1000); //최대 1000건
        if (partySearch.getMember() != null) {
            query = query.setParameter("member", partySearch.getMember());
        }

        return query.getResultList();
    }
}
