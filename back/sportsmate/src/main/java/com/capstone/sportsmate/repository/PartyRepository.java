package com.capstone.sportsmate.repository;


import com.capstone.sportsmate.domain.Apply;
import com.capstone.sportsmate.domain.Member;
import com.capstone.sportsmate.domain.Party;
import com.capstone.sportsmate.domain.PartyMember;
import com.capstone.sportsmate.domain.notice.Notice;
import com.capstone.sportsmate.web.PartySearch;
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
    public PartyMember isRole(Party party, Member member){
        PartyMember partyMember;
        try {
            partyMember = em.createQuery("select p from PartyMember p where p.member=:member and p.party=:party", PartyMember.class)
                    .setParameter("member", member)
                    .setParameter("party", party)
                    .getSingleResult();
        } catch(NoResultException e){
            return null;
        }
        return partyMember;
    }

    public Long mkPartyMember(PartyMember partyMember){
        em.persist(partyMember);
        return partyMember.getId();
    }
    public Party findOne(Long id) {
        return em.find(Party.class, id);
    }
    public List<Party> findAllString(PartySearch partySearch, Member member){
        String jpql="select p from Party p";

        //멤버의 이름으로 등록된 파티 찾기
        if(member!=null){
            jpql += " left join PartyMember s on p = s.party where s.member = :member";
        }

        TypedQuery<Party> query = em.createQuery(jpql, Party.class)
                .setMaxResults(1000); //최대 1000건
        if (member != null) {
            query = query.setParameter("member", member);
        }
        return query.getResultList();
    }

    public List<Party> SearchParties(PartySearch partySearch){
        String jpql="select p from Party p";

        //검색 조건으로 검색
        if(StringUtils.hasText(partySearch.getLocation())){
            jpql += " where p.location = :location";
            jpql += " and p.sportsName = :sportsName";
        }
        TypedQuery<Party> query = em.createQuery(jpql, Party.class)
                .setMaxResults(1000); //최대 1000건
        if (StringUtils.hasText(partySearch.getLocation())) {
            query = query.setParameter("location", partySearch.getLocation())
                    .setParameter("sportsName",partySearch.getSportsName());
        }
        return query.getResultList();
    }

}

