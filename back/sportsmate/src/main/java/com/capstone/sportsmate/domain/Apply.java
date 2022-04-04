package com.capstone.sportsmate.domain;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "apply")
@Getter
public class Apply {
    private Apply(){} // 생성자 호출 방지

    //entity 컬럼
    @Id
    @Column(name="apply_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Request state;

    @Column(name="since_date")
    private LocalDateTime sinceDate;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="party_id")
    private Party party;

    public static Apply createApply(Request state, LocalDateTime sinceDate, Member member, Party party) {
        Apply apply = new Apply();
        apply.state = state;
        apply.sinceDate = sinceDate;
        apply.member = member;
        apply.party = party;
        return apply;
    }
}
