package com.capstone.sportsmate.repository;

import com.capstone.sportsmate.domain.*;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import java.time.LocalDateTime;

import static com.capstone.sportsmate.domain.Log.createLog;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class EntityTest {

    @PersistenceContext EntityManager em;//모든 db가 db에 잘들어오는지 확인을 위해 넣겠음
    @Autowired MemberRepository memberRepository;

    @Test
    @Rollback(false)
    public void testMember() {
        Member member = Member.createMember("tset", Sex.MALE,"test@test","testtest",
                "fdsf",LocalDateTime.now(),LocalDateTime.now(),10000);
        Long savedId = memberRepository.save(member);
        Member findMember = memberRepository.findOne(savedId);
        Assertions.assertThat(findMember.getId()).isEqualTo(member.getId());
        Assertions.assertThat(findMember.getName()).isEqualTo(member.getName());
        Assertions.assertThat(findMember).isEqualTo(member); //JPA 엔티티 동일성 보장
    }

    @Test
    @Rollback(false)
    public void testLog() {
        Member findMember = memberRepository.findOne(1L);
        Log log = Log.createLog(11.1f,LocalDateTime.now(),findMember);
        em.persist(log);
        Log findLog = em.find(Log.class,log.getId());
        Assertions.assertThat(findLog.getId()).isEqualTo(log.getId());
        Assertions.assertThat(findLog.getScore()).isEqualTo(log.getScore());
        Assertions.assertThat(findLog.getMember()).isEqualTo(log.getMember()); //JPA 엔티티 동일성 보장
    }

    @Test
    @Rollback(false)
    public void testParty() {
        Member findMember = memberRepository.findOne(1L);
        Party party = Party.createParty(SportsName.BASEBALL,"여기","여기는 거깁니다",
                LocalDateTime.now(), 10, "그렇습니다 그래요", findMember);
        em.persist(party);
        Party findParty = em.find(Party.class,party.getId());
        Assertions.assertThat(findParty).isEqualTo(party);
    }

    @Test
    @Rollback(false)
    public void testPartyMember() {
        Member findMember = memberRepository.findOne(1L);
        Party findParty = em.find(Party.class,1L);
        PartyMember partyMember = PartyMember.createPartyMember(findMember,findParty
                ,Role.MEMBER, LocalDateTime.now());
        em.persist(partyMember);
        PartyMember findPartyMember = em.find(PartyMember.class,partyMember.getId());
        Assertions.assertThat(findPartyMember).isEqualTo(partyMember);
    }
}



