//package com.capstone.sportsmate.domain.notice;
//
//
//
//import com.capstone.sportsmate.domain.MatchApply;
//import com.fasterxml.jackson.annotation.JsonIgnore;
//
//import javax.persistence.*;
//
//import static javax.persistence.FetchType.LAZY;
//
//
//@Entity
//public class MatchBoardNotice extends Notice{
//    @JsonIgnore
//    @ManyToOne(fetch = LAZY)
//    @JoinColumn(name="match_apply_id")
//    private MatchApply matchApply;
//}
