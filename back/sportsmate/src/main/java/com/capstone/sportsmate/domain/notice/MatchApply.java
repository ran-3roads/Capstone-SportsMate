package com.capstone.sportsmate.domain.notice;

import com.capstone.sportsmate.domain.Member;
import com.capstone.sportsmate.domain.Schedule;
import com.capstone.sportsmate.domain.status.Request;
import com.capstone.sportsmate.web.MatchApplyForm;
import com.capstone.sportsmate.web.response.MatchApplyResponse;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;

import javax.persistence.*;
import java.time.LocalDateTime;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name="match_apply")
@Getter
public class MatchApply {
    //entity 컬럼
    @Id
    @Column(name="match_apply_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Request state;

    @Column(name="since_date")
    private LocalDateTime sinceDate;

    private String contents;

    @JsonIgnore
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @JsonIgnore
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="schedule_id")
    private Schedule schedule;

    public static  MatchApply createMatchApply(MatchApplyForm matchApplyForm,Member member,Schedule schedule){
        MatchApply matchApply = new MatchApply();
        matchApply.contents = matchApplyForm.getSuggest();
        matchApply.member = member;
        matchApply.schedule = schedule;
        matchApply.sinceDate = LocalDateTime.now();
        matchApply.state = Request.WAITING;

        return matchApply;
    }

    public MatchApplyResponse toMatchApplyResponse(){
        return new MatchApplyResponse(member.getNickName(),this.contents,this.id,this.state);
    }

    public void acceptMatchApply(){
        this.state = Request.ACCEPT;
    }

    public void rejectMatchApply() {
        this.state = Request.REJECT;
    }
}
