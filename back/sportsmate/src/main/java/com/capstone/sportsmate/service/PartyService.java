package com.capstone.sportsmate.service;

import com.capstone.sportsmate.domain.*;
import com.capstone.sportsmate.domain.notice.Apply;
import com.capstone.sportsmate.domain.notice.Notice;
import com.capstone.sportsmate.domain.notice.Reply;
import com.capstone.sportsmate.domain.status.*;
import com.capstone.sportsmate.exception.AlreadyExistException;
import com.capstone.sportsmate.repository.MemberRepository;
import com.capstone.sportsmate.repository.NoticeRepository;
import com.capstone.sportsmate.repository.PartyMemberRepository;
import com.capstone.sportsmate.repository.PartyRepository;
import com.capstone.sportsmate.util.SecurityUtil;
import com.capstone.sportsmate.web.MemberApplyForm;
import com.capstone.sportsmate.web.PartySearch;
import com.capstone.sportsmate.web.PartyForm;
import com.capstone.sportsmate.web.response.PartyMemberResponse;
import com.capstone.sportsmate.web.response.PartyResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PartyService {
    private final MemberRepository memberRepository;
    private final PartyRepository partyRepository;
    private final NoticeRepository noticeRepository;
    private final PartyMemberRepository partyMemberRepository;

    @Transactional
    public Long mkParty (PartyForm form, Long id){
        if(validateDuplicateParty(form.getTitle()))
            throw new AlreadyExistException("이미 존재하는 파티입니다.");//중복 파티이름 검증
        Member member= memberRepository.findById(id).orElseThrow(()->new RuntimeException("멤버를 찾을수 없습니다."));
        Party party = Party.createParty(form.getSportsName(), form.getTitle(), form.getLocation(), form.getIntro(), LocalDate.now(),1,form.getInfo());
        partyRepository.save(party); // 파티 저장
        JoinPartytoHost(party,member); //파티멤버 추가
        return party.getId();
    }
    @Transactional
    public Long joinParty (MemberApplyForm form,Long partyId, Long memberId){
        Member member= memberRepository.findById(memberId)
                .orElseThrow(()->new RuntimeException("멤버를 찾을수 없습니다."));

        Party party= partyRepository.findById(partyId)
                .orElseThrow(()->new RuntimeException("파티를 찾을수 없습니다."));
        validateDuplicateApply(party,member);

        Member hostMember=partyMemberRepository.findByPartyAndRole(party,Role.HOST)
                .orElseThrow(()->new RuntimeException("멤버를 찾을수 없습니다."))
                .getMember();//해당 파티의 host 찾기
        Apply apply=Apply.createApply(Request.WAITING, LocalDateTime.now(),member,party,form.getContents());//apply 생성
        Notice notice=Notice.createNotice(hostMember,NoticeType.APPLY, NoticeStatus.UNCONFIRM,LocalDateTime.now());//notice 생성
        notice.setApply(apply);
        notice.setReply(null);
        noticeRepository.saveApply(apply);
        noticeRepository.saveNotice(notice);

        return party.getId();
    }
    @Transactional
    public void acceptApply (Long partyId,Long applyId){

        Apply apply= noticeRepository.findApplyOne(applyId);
        if(!validateDuplicateCheck(apply)){throw new AlreadyExistException("이미 처리한 지원서입니다.");}
        apply.setState(Request.ACCEPT);

        Party party= partyRepository.findById(partyId)
                .orElseThrow(()->new RuntimeException("파티를 찾을수 없습니다."));
        party.addMember();
        PartyMember partyMember= PartyMember.createPartyMember(apply.getMember(),party, Role.MEMBER, LocalDate.now());
        partyMemberRepository.save(partyMember);

        sendReply(apply.getMember(),Request.ACCEPT,party);

    }
    @Transactional
    public void rejectApply (Long partyId,Long applyId){

        Apply apply= noticeRepository.findApplyOne(applyId);
        if(!validateDuplicateCheck(apply)){throw new AlreadyExistException("이미 처리한 지원서입니다.");}
        sendReply(apply.getMember(),Request.REJECT,apply.getParty());
        apply.setState(Request.REJECT);
    }
    //-----------지원서 중복 승락 및 거절 방지----------
    public boolean validateDuplicateCheck(Apply apply) {
        if(apply.getState().equals(Request.WAITING)){ //대기 처리면 true
            return true;
        }
        return false; //수락 또는 거절했으면 false
    }
    //----- 지원했는데 방장이 확인못해서 waiting 인 상황-----
    public boolean applyWaitForHost(Long partyId, Long memberId) {
        Party party=partyRepository.findById(partyId)
                .orElseThrow(()->new RuntimeException("파티를 찾을수 없습니다."));
        Member member=memberRepository.findById(memberId).orElseThrow(()->new RuntimeException("멤버를 찾을수 없습니다."));
        Apply apply=noticeRepository.findByApply(party,member);
        if(apply==null) return false; // 지원조차안했으면 false
        if(apply.getState().equals(Request.WAITING)){ //대기 처리면 true
            return true;
        }
        return false; //수락 또는 거절했으면 false
    }

    @Transactional
    public void updateParty(Long partyId, String title, SportsName sportsName, String intro, String info, String location) {
        Party findParty = partyRepository.findById(partyId)
                .orElseThrow(()->new RuntimeException("파티를 찾을수 없습니다."));
        if (title != null && intro != null && info != null && location != null) {
            if (!title.equals(findParty.getTitle())) { //그전 타이틀과 같은지 확인
                if(validateDuplicateParty(findParty.getTitle()))
                    throw new AlreadyExistException("이미 존재하는 파티입니다.");//중복 파티이름 검증
            }
            findParty.setTitle(title);
            findParty.setSportsName(sportsName);
            findParty.setIntro(intro);
            findParty.setInfo(info);
            findParty.setLocation(location);
        }
        else
            throw new NullPointerException();
    }
    public Party findOne(Long partyId){
        return partyRepository.findById(partyId)
                .orElseThrow(()->new RuntimeException("파티를 찾을수 없습니다."));
    }
    public PartyResponse viewParty(Long partyId){
        Party party=partyRepository.findById(partyId)
                .orElseThrow(()->new RuntimeException("파티를 찾을수 없습니다."));
        Member hostMember= partyMemberRepository.findByPartyAndRole(party,Role.HOST)
                .orElseThrow(()->new RuntimeException("멤버를 찾을수 없습니다."))
                .getMember();//호스트 찾기
        return party.toPartyResponse(hostMember.getNickName());
    }

    public boolean isCheckRole(Long partyId, Long memberId){
        Party party = partyRepository.findById(partyId)
                .orElseThrow(()->new RuntimeException("파티를 찾을수 없습니다."));
        Member member = memberRepository.findById(memberId).orElseThrow(()->new RuntimeException("멤버를 찾을수 없습니다."));
        PartyMember partyMember= partyMemberRepository.findByPartyAndMember(party,member)
                .orElseThrow(()->new RuntimeException("멤버를 찾을수 없습니다."));
        if(partyMember==null) return false;
        if(!partyMember.getRole().equals(Role.HOST))return false;
        return true;
    }
    //파티 수락했다는 메소드
    public void sendReply(Member toMember,Request request,Party party){

        Reply reply= Reply.createReply(request,party);
        noticeRepository.saveReply(reply);

        Notice notice = Notice.createNotice(toMember, NoticeType.PARTYREPLY,NoticeStatus.UNCONFIRM, LocalDateTime.now());
        notice.setReply(reply);
        notice.setApply(null);

        noticeRepository.saveNotice(notice);
    }


    public boolean isPartyMember(Long partyId, Long memberId){
        Party party = partyRepository.findById(partyId)
                .orElseThrow(()->new RuntimeException("파티를 찾을수 없습니다."));
        Member member = memberRepository.findById(memberId).orElseThrow(()->new RuntimeException("멤버를 찾을수 없습니다."));
        PartyMember partyMember= partyMemberRepository.findByPartyAndMember(party,member)
                .orElseThrow(()->new RuntimeException("멤버를 찾을수 없습니다."));

        if(partyMember==null) return false;
        return true;
    }

    public List<Party> getPartyList(){
       return partyRepository.findAll();
    }

    private void JoinPartytoHost(Party party, Member member){
        PartyMember partyMember= PartyMember.createPartyMember(member,party, Role.HOST,LocalDate.now());
        partyMemberRepository.save(partyMember);
    }
    private boolean validateDuplicateParty(String title) {
        return  partyRepository.findByTitle(title)
                .isPresent();

    }
    private void validateDuplicateApply(Party party,Member member) {
        Apply apply = noticeRepository.findByApply(party,member);
        if(apply!=null){
            throw new AlreadyExistException("이미 신청했던 파티입니다.");
        }
    }

    public List<Party> findMyParties(Long id) { //멤버가 가입한 파티리스트 출력
        Member member=memberRepository.findById(id).orElseThrow(()->new RuntimeException("멤버를 찾을수 없습니다."));
        return partyRepository.findByMember(member);
    }
    public List<Party> findSearchParties(PartySearch partySearch) { //멤버가 가입한 파티리스트 출력
        return partyRepository.SearchParties(partySearch.getLocation(),partySearch.getSportsName());
    }

    public List<PartyMemberResponse> partyMemberList(Long partyId) {
        return partyMemberRepository.findByParty(partyRepository.findById(partyId)
                .orElseThrow(()->new RuntimeException("파티를 찾을수 없습니다.")))
                .stream().map(PartyMember::toPartyMemberResponse).collect(Collectors.toList());
    }

    @Transactional
    public void deletePartyMember(Long partyId,Long partyMemberId) {
        Party party=partyRepository.findById(partyId)
                .orElseThrow(()->new RuntimeException("파티를 찾을수 없습니다."));
        PartyMember partyMember=partyMemberRepository.findOneById(partyMemberId).orElseThrow(() -> new AlreadyExistException("이미 없는 회원입니다."));;
        party.minusMember();
        //추방 문자 보내기
        sendReply(partyMember.getMember(),Request.BANISH,party);
        partyMemberRepository.deleteById(partyMemberId);

        Apply apply=noticeRepository.findByApply(party,partyMember.getMember());
        Notice notice=noticeRepository.findNoticeByApply(apply);

        noticeRepository.deleteApply(apply);
        noticeRepository.deleteNotice(notice);
    }

    //파티 탈퇴
    @Transactional
    public void leavePartyMember(Long partyId) {
        Party party=partyRepository.findById(partyId)
                .orElseThrow(()->new RuntimeException("파티를 찾을수 없습니다."));
        Member member=memberRepository.findById(SecurityUtil.getCurrentMemberId())
                .orElseThrow(()->new RuntimeException("멤버를 찾을수 없습니다."));

        party.minusMember();
        partyMemberRepository.deleteByPartyAndMember(
                party,member);

        Apply apply=noticeRepository.findByApply(party,member);
        Notice notice=noticeRepository.findNoticeByApply(apply);
        noticeRepository.deleteApply(apply);
        noticeRepository.deleteNotice(notice);
    }
}
