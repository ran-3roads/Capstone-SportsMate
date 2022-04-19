package com.capstone.sportsmate.domain;


import com.capstone.sportsmate.domain.notice.Notice;
import com.capstone.sportsmate.domain.status.Request;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDate;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "apply")
@Getter
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

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="party_id")
    private Party party;

    @OneToOne(mappedBy = "apply")
    private Notice notice;

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
