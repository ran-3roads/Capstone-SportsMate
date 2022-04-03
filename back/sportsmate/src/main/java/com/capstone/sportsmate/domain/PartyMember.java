package com.capstone.sportsmate.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import java.time.LocalDateTime;
import java.util.Date;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "partymember")
@Getter @Setter
public class PartyMember {
    private PartyMember(){}
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
    private LocalDateTime sinceDate;




    public static PartyMember createPartyMember(Member member, Party party, Role role, LocalDateTime sinceDate){
        PartyMember partyMember = new PartyMember();
        partyMember.setMember(member);
        partyMember.setParty(party);
        partyMember.setRole(role);
        partyMember.setSinceDate(sinceDate);
        return partyMember;
    }

}
