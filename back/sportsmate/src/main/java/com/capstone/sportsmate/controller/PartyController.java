package com.capstone.sportsmate.controller;


import com.capstone.sportsmate.domain.Member;
import com.capstone.sportsmate.domain.Party;
import com.capstone.sportsmate.service.MemberService;
import com.capstone.sportsmate.service.PartyService;
import com.capstone.sportsmate.web.MemberForm;
import com.capstone.sportsmate.web.PartyForm;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/sportsmate")
@RequiredArgsConstructor
public class PartyController {
    private final PartyService partyService;
    private final MemberService memberService;

    @GetMapping("/party/{memberId}/myparty") //일단은 그냥 id 값 받는걸로 함 추후 security 숙지되면 변경할 예정
    public List<Party> myParty(@PathVariable("memberId") Long memberId){
        List<Party> parties = partyService.findParties(memberId);
        return parties;
    }

    @PostMapping("/party/{memberId}/mkparty")
    String createParty(@RequestBody PartyForm form,@PathVariable("memberId") Long memberId){
        partyService.mkParty(form,memberId);
        return "success";
    }
}
