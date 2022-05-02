package com.capstone.sportsmate.domain;

import com.capstone.sportsmate.domain.status.Role;
import com.capstone.sportsmate.web.response.PartyMemberResponse;
import lombok.Getter;

import javax.persistence.*;

import java.time.LocalDate;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "partymember")
@Getter
public class PartyMember {
    private PartyMember(){} // 생성자 호출 방지
    //entity 컬럼
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="party_member_id")
    private Long id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="party_id")
    private Party party;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name="since_date")
    private LocalDate sinceDate;

    // entity 생성

    public static PartyMember createPartyMember(Member member, Party party, Role role, LocalDate sinceDate){
        PartyMember partyMember = new PartyMember();
        partyMember.member = member;
        partyMember.party = party;
        partyMember.role = role;
        partyMember.sinceDate = sinceDate;
        return partyMember;
    }
    public PartyMemberResponse toPartyMemberResponse(){
        return new PartyMemberResponse(member.getNickName(), member.getBirthDate(),
                member.getSex(), role,member.getSinceDate());
    }

}
