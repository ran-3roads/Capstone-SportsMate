package com.capstone.sportsmate.repository;

import com.capstone.sportsmate.domain.Apply;
import com.capstone.sportsmate.domain.Member;
import com.capstone.sportsmate.domain.Party;
import com.capstone.sportsmate.domain.notice.Notice;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class NoticeRepository {
    private final EntityManager em;

    public List<Notice> findNotices(Member member){
        String jpql="select n from Notice n";

        //검색 조건으로 검색
        jpql += " where n.member = :member";
        TypedQuery<Notice> query = em.createQuery(jpql, Notice.class)
                .setMaxResults(1000); //최대 1000건
        if(member != null) {
            query = query.setParameter("member", member);
        }
        return query.getResultList();
    }

    public Notice findOne(Long id) {
        return em.find(Notice.class, id);
    }

    public Notice isRoute(Notice notice,Member member){
        Notice authNotice;
        try {
            authNotice = em.createQuery("select n from Notice n where n = :notice and n.member = :member", Notice.class)
                    .setParameter("notice", notice)
                    .setParameter("member",member)
                    .getSingleResult();
        } catch(NoResultException e){
            return null;
        }
        return authNotice;
    }
    public Long saveApply(Apply apply){
        em.persist(apply);
        return apply.getId();
    }
    public Long saveNotice(Notice notice){
        em.persist(notice);
        return notice.getId();
    }
}
