package com.capstone.sportsmate.controller;


import com.capstone.sportsmate.domain.Party;
import com.capstone.sportsmate.domain.notice.Notice;
import com.capstone.sportsmate.exception.MyRoleException;
import com.capstone.sportsmate.web.PartySearch;
import com.capstone.sportsmate.service.MemberService;
import com.capstone.sportsmate.service.PartyService;
import com.capstone.sportsmate.web.PartyForm;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sportsmate/party")
@RequiredArgsConstructor
public class PartyController {
    private final PartyService partyService;
    private final MemberService memberService;

    @GetMapping("/myparty") //일단은 그냥 id 값 받는걸로 함 추후 security 숙지되면 변경할 예정
    public List<Party> myParty(){
        List<Party> parties = partyService.findMyParties(memberService.getMyInfo().getId());
        return parties;
    }
    @GetMapping("/search") //파티 검색
    public List<Party> search(@RequestBody PartySearch form){
        List<Party> parties= partyService.findSearchParties(form);
        return parties;
    }
    @PostMapping("/{partyId}/join") // 파티참가
    String joinParty(@PathVariable("partyId") Long partyId){
        partyService.joinParty(partyId,memberService.getMyInfo().getId());
        return "success";
    }

    @GetMapping("/{partyId}/info")
    public Party viewParty(@PathVariable("partyId") Long partyId){
        Party party= partyService.findOne(partyId);
        return party;
    }

    @GetMapping("/{partyId}/info/modify")
    public Party editParty(@PathVariable("partyId") Long partyId){
        if(!partyService.isCheckRole(partyId,memberService.getMyInfo().getId())){
            throw new MyRoleException("수정 권한이 없습니다."); //exception 리턴타입 수정해야함
        }
        Party party= partyService.findOne(partyId);
        return party;
    }
    @PostMapping("/{partyId}/modify") // 방장 권한이 있는 유저만 검색가능
    public String updateItem(@RequestBody PartyForm form, @PathVariable("partyId") Long partyId){
        if(!partyService.isCheckRole(partyId,memberService.getMyInfo().getId())){ //exception 리턴타입 수정해야함
            throw new MyRoleException("수정 권한이 없습니다.");
        }
        partyService.updateParty( partyId,form.getTitle(), form.getIntro(), form.getInfo(),form.getLocation());
        return  "redirect";
    }

    @PostMapping("/mkparty") // 파티 만들기
    String createParty(@RequestBody PartyForm form){
        partyService.mkParty(form,memberService.getMyInfo().getId());
        return "success";
    }

}
