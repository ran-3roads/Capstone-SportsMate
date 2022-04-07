package com.capstone.sportsmate.repository;

import com.capstone.sportsmate.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class MemberRepository {
    private final EntityManager em;

    public Long save(Member member) {
        em.persist(member);
        return member.getId();
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
}
