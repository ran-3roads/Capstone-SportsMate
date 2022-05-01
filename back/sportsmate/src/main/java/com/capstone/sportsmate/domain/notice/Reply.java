package com.capstone.sportsmate.domain.notice;

import com.capstone.sportsmate.domain.Party;
import com.capstone.sportsmate.domain.status.Request;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Table(name = "reply")
@Getter @Setter
public class Reply { //응답에 대한 entity
    @Id
    @Column(name="reply_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Request state;

    @JsonIgnore
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name="party_id")
    private Party party;

    public static Reply createReply(Request state, Party party){
        Reply reply= new Reply();
        reply.state=state;
        reply.party=party;
        return reply;
    }

}
