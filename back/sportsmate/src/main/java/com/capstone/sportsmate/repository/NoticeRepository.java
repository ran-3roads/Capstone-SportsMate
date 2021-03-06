package com.capstone.sportsmate.repository;

import com.capstone.sportsmate.domain.notice.Apply;
import com.capstone.sportsmate.domain.Member;
import com.capstone.sportsmate.domain.Party;
import com.capstone.sportsmate.domain.notice.Reply;
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
    public List<Apply> findApplies(Party party){
        String jpql="select a from Apply a";

        //검색 조건으로 검색
        jpql += " where a.party = :party";
        TypedQuery<Apply> query = em.createQuery(jpql, Apply.class)
                .setMaxResults(1000); //최대 1000건
        if(party != null) {
            query = query.setParameter("party", party);
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
    public Apply findByApply(Party party, Member member){
        Apply apply;
        try {
            apply = em.createQuery("select a from Apply a where a.member=:member and a.party=:party", Apply.class)
                    .setParameter("member", member)
                    .setParameter("party", party)
                    .getSingleResult();
        } catch(NoResultException e){
            return null;
        }
        return apply;
    }
    public Apply findApplyOne(Long id){
        return em.find(Apply.class, id);
    }
    public Reply findReply(Party party,Member member){
        Reply reply;
        try {
            reply = em.createQuery("select a from Apply a where a.member=:member and a.party=:party", Reply.class)
                    .setParameter("member", member)
                    .setParameter("party", party)
                    .getSingleResult();
        } catch(NoResultException e){
            return null;
        }
        return reply;
    }

    public Notice findNoticeByApply(Apply apply){
        Notice notice;
        try {
            notice = em.createQuery("select n from Notice n where n.apply=:apply", Notice.class)
                    .setParameter("apply", apply)
                    .getSingleResult();
        } catch(NoResultException e){
            return null;
        }
        return notice;
    }
    public Long saveApply(Apply apply){
        em.persist(apply);
        return apply.getId();
    }
    public Long saveReply(Reply reply){
        em.persist(reply);
        return reply.getId();
    }
    public Long saveNotice(Notice notice){
        em.persist(notice);
        return notice.getId();
    }
    public Long deleteApply(Apply apply){
        em.remove(apply);
        return apply.getId();
    }
    public Long deleteNotice(Notice notice){
        em.remove(notice);
        return notice.getId();
    }
}
