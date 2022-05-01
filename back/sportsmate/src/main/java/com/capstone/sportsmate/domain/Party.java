package com.capstone.sportsmate.domain;

import com.capstone.sportsmate.domain.status.SportsName;
import com.capstone.sportsmate.web.response.PartyResponse;
import com.capstone.sportsmate.web.response.ScheduleResponse;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name="party")
@Getter
@Setter
public class Party {

    //entity 컬럼

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="party_id")
    private Long id; //primary key

    @Enumerated(EnumType.STRING)
    @Column(name="sports_name")
    private SportsName sportsName;

    private String location;//위치이름
    private String intro;//간단한 소개
    private String title;

    @Column(name="since_date")
    private LocalDate sinceDate;//가입날짜

    @Column(name="current_member")
    private int currentMember;//현재 인원

    @Column(columnDefinition = "TEXT")
    private String info;//정보탭


    // entity 생성

    public static Party createParty(SportsName sportsName,String title, String location, String intro, LocalDate sinceDate, int currentMember, String info) {
        Party party = new Party();
        party.sportsName = sportsName;
        party.title=title;
        party.location = location;
        party.intro = intro;
        party.sinceDate = sinceDate;
        party.currentMember = currentMember;
        party.info = info;
        return party;
    }

    public void addMember(){
        this.currentMember = this.currentMember + 1;
    }
    public PartyResponse toPartyResponse(String manager){
        PartyResponse partyResponse =new  PartyResponse(this.id,this.sportsName,this.location,this.intro,this.title,manager,this.sinceDate,this.currentMember,this.info);
        return partyResponse;
    }



    //    @OneToMany(mappedBy = "party")
//    private List<PartyMember> partyMembers= new ArrayList<>();

    //apply 부분 몰겟다
}
