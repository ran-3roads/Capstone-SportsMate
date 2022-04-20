package com.capstone.sportsmate.domain;


import com.capstone.sportsmate.domain.notice.Notice;
import com.capstone.sportsmate.domain.status.Request;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "apply")
@Getter@Setter
public class Apply {

    //entity 컬럼
    @Id
    @Column(name="apply_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Request state;

    @Column(name="since_date")
    private LocalDate sinceDate;

    @JsonIgnore
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @JsonIgnore
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="party_id")
    private Party party;


    // entity 생성

    public static Apply createApply(Request state, LocalDate sinceDate, Member member, Party party) {
        Apply apply = new Apply();
        apply.state = state;
        apply.sinceDate = sinceDate;
        apply.member = member;
        apply.party = party;
        return apply;
    }
}
