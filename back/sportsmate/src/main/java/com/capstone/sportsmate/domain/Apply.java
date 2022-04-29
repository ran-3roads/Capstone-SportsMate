package com.capstone.sportsmate.domain;


import com.capstone.sportsmate.domain.notice.Notice;
import com.capstone.sportsmate.domain.status.Request;
import com.capstone.sportsmate.web.ApplyForm;
import com.capstone.sportsmate.web.response.ScheduleResponse;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

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
    private LocalDateTime sinceDate;

    @Column(columnDefinition = "TEXT")
    private String contents;

    @JsonIgnore
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @JsonIgnore
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="party_id")
    private Party party;


    // entity 생성

    public static Apply createApply(Request state, LocalDateTime sinceDate, Member member, Party party,String contents) {
        Apply apply = new Apply();
        apply.state = state;
        apply.sinceDate = sinceDate;
        apply.member = member;
        apply.party = party;
        apply.contents=contents;
        return apply;
    }

    public ApplyForm toApplyForm(){
        ApplyForm applyForm =new ApplyForm(this.id,this.party.getTitle(),this.member.getName(),
                this.member.getEmail(),this.sinceDate,this.member.getSex(),this.state,this.contents);
        return applyForm;
    }
}
