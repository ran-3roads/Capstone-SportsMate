package com.capstone.sportsmate.repository;

import com.capstone.sportsmate.domain.*;
import org.assertj.core.api.Assertions;
import org.hibernate.mapping.Join;
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
        Member member = Member.createMember("tset2", Sex.MALE,"test@test","testtest",
                "fdsf",LocalDateTime.now(),LocalDateTime.now(),"010-1111-1111",10000);
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

    @Test
    @Rollback(false)
    public void testApply() {
        Member findMember = memberRepository.findOne(1L);
        Party findParty = em.find(Party.class,1L);
        Apply apply = Apply.createApply(Request.ACCEPT, LocalDateTime.now(),findMember,findParty);
        em.persist(apply);
        Apply findApply = em.find(Apply.class,apply.getId());
        Assertions.assertThat(findApply).isEqualTo(apply);
    }

    @Test
    @Rollback(false)
    public void testArena() {
        Arena arena = Arena.createArena(10, 22, 1000, SportsName.BASEBALL,"한성대학교");
        em.persist(arena);
        Arena findArena = em.find(Arena.class , arena.getId());
        Assertions.assertThat(findArena).isEqualTo(arena);
    }

    @Test
    @Rollback(false)
    public void testRegist() {
        Arena findArena = em.find(Arena.class,1L);
        Regist regist = Regist.createRegist(LocalDateTime.now(), LocalDateTime.now(),findArena);
        em.persist(regist);
        Regist findRegist = em.find(Regist.class,1L);
        Assertions.assertThat(regist).isEqualTo(findRegist);
    }

    @Test
    @Rollback(false)
    public void testSchedule() {
        Regist findRegist = em.find(Regist.class, 1L);
        Schedule schedule = Schedule.createSchedule(10000, 10, 20,
                "dsfdsafdsafdsa", findRegist);
        em.persist(schedule);
        Schedule findSchedule = em.find(Schedule.class,1L);
        Assertions.assertThat(schedule).isEqualTo(findSchedule);
    }

    @Test
    @Rollback(false)
    public void testJoinGame() {
        Regist findRegist = em.find(Regist.class, 1L);
        Member findMember = memberRepository.findOne(1L);
        JoinGame joinGame = JoinGame.createJoinGame(findMember, findRegist);
        em.persist(joinGame);
        JoinGame findJoinGame = em.find(JoinGame.class, 1L);
        Assertions.assertThat(joinGame).isEqualTo(findJoinGame);
    }

    @Test
    @Rollback(false)
    public void testMatchBoard() {
        Regist findRegist = em.find(Regist.class, 1L);
        Member findMember = memberRepository.findOne(1L);
        MatchBoard matchBoard = MatchBoard.createMatchBoard(20, 10000, "알랑라리리ㅇㅇ리리",
                Category.HIRED, findRegist, findMember);
        em.persist(matchBoard);
        MatchBoard findMatchBoard = em.find(MatchBoard.class, 1L);
        Assertions.assertThat(matchBoard).isEqualTo(findMatchBoard);
    }

    @Test
    @Rollback(false)
    public void testPartyBoard() {
        Member findMember = memberRepository.findOne(1L);
        Party findParty = em.find(Party.class,1L);
        PartyBoard partyBoard = PartyBoard.createPartyBoard(Category.HIRED, "눈누난dddd다", "그렇다 이말이야 ",
                LocalDateTime.now(), findMember, findParty);
        em.persist(partyBoard);
        PartyBoard findPartyBoard = em.find(PartyBoard.class, 1L);
        Assertions.assertThat(partyBoard).isEqualTo(findPartyBoard);

    }

    @Test
    @Rollback(false)
    public void testVote() {
        PartyBoard findPartyBoard = em.find(PartyBoard.class, 3L);
        Vote vote = Vote.createVote(1, 2, 3, 4, 5, findPartyBoard);
        em.persist(vote);
        Vote findVote = em.find(Vote.class, 1L);
        Assertions.assertThat(vote).isEqualTo(findVote);

    }

    @Test
    @Rollback(false)
    public void testComment() {
        Member findMember = memberRepository.findOne(1L);
        PartyBoard findPartyBoard = em.find(PartyBoard.class,1L);
        Comment comment = Comment.createComment("dccdc", LocalDateTime.now(),findMember,findPartyBoard);
        em.persist(comment);
        Comment findComment = em.find(Comment.class,1L);
        Assertions.assertThat(findComment).isEqualTo(comment);
    }




}



