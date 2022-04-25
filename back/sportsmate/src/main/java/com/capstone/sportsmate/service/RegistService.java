package com.capstone.sportsmate.service;


import com.capstone.sportsmate.domain.Arena;
import com.capstone.sportsmate.domain.Party;
import com.capstone.sportsmate.domain.Schedule;
import com.capstone.sportsmate.repository.PartyRepository;
import com.capstone.sportsmate.repository.RegistRepository;
import com.capstone.sportsmate.web.BookForm;
import com.capstone.sportsmate.web.response.EventResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RegistService {
    private final RegistRepository registRepository;
    private final PartyRepository partyRepository;

    public List<EventResponse> getEventList(Long partyId){
        Party party= partyRepository.findOne(partyId);
        return registRepository.findByParty(party).stream().map(Schedule::toEventResponse).collect(Collectors.toList());
    }

    public List<Arena> getArenaList(Long partyId){
        Party party= partyRepository.findOne(partyId);
        return registRepository.findBySportsName(party.getSportsName());
    }
    public Arena getArenaInfo(Long arenaId){
        return registRepository.findArenaOne(arenaId);
    }

    public boolean isFull(BookForm bookForm){
        return true;
    }

}
