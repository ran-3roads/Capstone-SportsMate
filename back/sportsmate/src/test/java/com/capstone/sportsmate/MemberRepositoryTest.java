package com.capstone.sportsmate;

import com.capstone.sportsmate.domain.Member;
import com.capstone.sportsmate.repository.MemberRepository;
import org.assertj.core.api.Assertions;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.Assert.*;
import java.util.Date;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class MemberRepositoryTest {
    @Autowired MemberRepository memberRepository;

    @Test
    @Rollback(false)
    public void testMember() {
        Member member = new Member();
        member.setName("memberA");
        member.setNickName("memberASAS");
        member.setBirthDate(new Date());
        member.setPassword("asdfasdf");
        member.setSex("MALE");
        member.setEmail("ckstjd9735@gmail.com");
        member.setSinceDate(new Date());
        member.setCredit(10000);
        Long savedId = memberRepository.save(member);
        Member findMember = memberRepository.findOne(savedId);
        Assertions.assertThat(findMember.getId()).isEqualTo(member.getId());
        Assertions.assertThat(findMember.getName()).isEqualTo(member.getName());
        Assertions.assertThat(findMember).isEqualTo(member); //JPA 엔티티 동일성 보
    }
}


