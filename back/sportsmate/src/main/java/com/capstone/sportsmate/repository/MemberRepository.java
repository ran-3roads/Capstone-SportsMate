package com.capstone.sportsmate.repository;


import com.capstone.sportsmate.domain.Member;
import com.capstone.sportsmate.domain.Party;
import com.capstone.sportsmate.domain.PartyMember;
import com.capstone.sportsmate.domain.status.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class MemberRepository {
    private final EntityManager em;

    public Member save(Member member) {
        em.persist(member);
        return member;
    }
    public Member findOne(Long id) {
        return em.find(Member.class, id);
    }

    public List<Member>findAll(){
        return em.createQuery("select m from Member m", Member.class)
                .getResultList();
    }
    public Member findByEmail(String email){
        Member member;
        try {
            member = em.createQuery("select m from Member m where m.email=:email", Member.class)
                    .setParameter("email", email).getSingleResult();
        } catch(NoResultException e){
            return null;
        }
        return member;
    }
    public Member findPartyHost(Party party){
        PartyMember hostMember;
        try {
            hostMember = em.createQuery("select m from PartyMember m where m.party=:party and m.role=:role", PartyMember.class)
                    .setParameter("party", party)
                    .setParameter("role", Role.HOST)
                    .getSingleResult();
        } catch(NoResultException e){
            return null;
        }
        return hostMember.getMember();
    }

}
