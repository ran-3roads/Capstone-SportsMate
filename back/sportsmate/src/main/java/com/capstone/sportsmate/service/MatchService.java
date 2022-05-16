package com.capstone.sportsmate.service;

import com.capstone.sportsmate.domain.*;
import com.capstone.sportsmate.domain.notice.MatchApply;
import com.capstone.sportsmate.domain.notice.Notice;
import com.capstone.sportsmate.domain.notice.Reply;
import com.capstone.sportsmate.domain.status.NoticeStatus;
import com.capstone.sportsmate.domain.status.NoticeType;
import com.capstone.sportsmate.domain.status.Request;
import com.capstone.sportsmate.exception.AlreadyExistException;
import com.capstone.sportsmate.exception.NotFoundEntityException;
import com.capstone.sportsmate.exception.RegistException;
import com.capstone.sportsmate.repository.*;
import com.capstone.sportsmate.util.SecurityUtil;
import com.capstone.sportsmate.web.MatchApplyForm;
import com.capstone.sportsmate.web.MatchForm;
import com.capstone.sportsmate.web.response.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MatchService {
    private final MatchBoardRepository matchBoardRepository;
    private final RegistRepository registRepository;
    private final MemberRepository memberRepository;
    private final ScheduleRepository scheduleRepository;
    private final MatchApplyRepository matchApplyRepository;
    private final NoticeRepository noticeRepository;
    private final JoinGameRepository joinGameRepository;

    private final PartyService partyService;
    private final RegistService registService;

    //게시판 생성
    @Transactional
    public void createMatchBoard(MatchForm matchForm, Long scheduleId) {
        Schedule findSchedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(()-> new RuntimeException("해당 스케줄 없음"));
        Member findMember = memberRepository.findOne(SecurityUtil.getCurrentMemberId());
        //방장 권한체크
        if(!partyService.isCheckRole(findSchedule.getParty().getId(),findMember.getId())){
            throw new RuntimeException("해당파티의 방장이 아니므로 권한이 없습니다.");
        }
        MatchBoard matchBoard = MatchBoard.createMatchBoard(findSchedule, findMember, matchForm);
        matchBoardRepository.save(matchBoard);
    }
    //게시판 리스트
    public List<MatchBoardListResponse> getMatchBoardList() {

        return matchBoardRepository.findAll().stream().map(MatchBoard::toMatchBoardListResponse).collect(Collectors.toList());
    }
    //게시판 조회
    public MatchBoardResponse getMatchBoardResponse(Long matchBoardId) {
        return matchBoardRepository.findById(matchBoardId)
                        .orElseThrow(()-> new RuntimeException("해당 메치게시판 없음")).toMatchBoardResponse();
    }
    //내 경기 확인
    public ScheduleResponse getMyMatch(Long registId){
        Regist regist = registRepository.findRegistOne(registId);
        return scheduleRepository.findByRegist(regist)
                .orElseThrow(()-> new RuntimeException("해당스케쥴없음")).toScheduleResponse();
    }


    //용병신청서 만들기
    @Transactional
    public void createMatchApply(MatchApplyForm matchApplyForm) {

        Regist findRegist = registRepository.findRegistOne(matchApplyForm.getRegistId());
        Member findMember = memberRepository.findOne(SecurityUtil.getCurrentMemberId());
        Schedule findSchedule = scheduleRepository.findByRegist(findRegist)
                .orElseThrow(() -> new RuntimeException("해당 스케줄이 없음"));//크흠 수정이 필요할거같다.

        if(matchApplyRepository.existsByMemberAndSchedule(findMember,findSchedule))
            throw new AlreadyExistException("이미 요청을 보냈습니다.");

        if(findMember.getCredit()<(int)findSchedule.toScheduleResponse().getNShotCredit())
            throw new RegistException("금액이 부족합니다.");

        MatchBoard findMatchBoard =matchBoardRepository.findByRegist(findRegist)
                .orElseThrow(()->new RuntimeException("그런 매치보드 없다"));
        Member host = findMatchBoard.getMember();

        MatchApply matchApply = MatchApply.createMatchApply(matchApplyForm, findMember, findSchedule);

        Notice notice=Notice.createNotice(host,NoticeType.MATCHAPPLY, NoticeStatus.UNCONFIRM,LocalDateTime.now());//notice 생성
        notice.setMatchApply(matchApply);

        matchApplyRepository.save(matchApply);
        noticeRepository.saveNotice(notice);
    }

    //한 스케줄의 용병신청 전체 조회하기
    public List<MatchApplyResponse> getMatchApplyList(Long scheduleId) {
        Schedule findSchedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new RuntimeException("스케줄이 없습니다."));
        return matchApplyRepository.findBySchedule(findSchedule).stream()
                .map(MatchApply::toMatchApplyResponse).collect(Collectors.toList());
    }
    //용병신청 accept
    @Transactional
    public void accptMatchApply(Long matchApplyId) {
        MatchApply findMatchApply = matchApplyRepository.findById(matchApplyId)
                .orElseThrow(() -> new RuntimeException("해당 apply가 없습니다."));


        Member findMember = findMatchApply.getMember();

        Schedule findSchedule = findMatchApply.getSchedule();
        //금액 체크
        if(findMember.getCredit()<(int)findSchedule.toScheduleResponse().getNShotCredit()) {
            rejectMatchApply(matchApplyId);
            return;
        }
        //최대인원 체크
        if(findSchedule.isMaxMember())
            throw new RuntimeException("정원이 다찼습니다.");
        //상태 변경
        findMatchApply.acceptMatchApply();

        Regist findRegist = findSchedule.getRegist();

        MatchBoard findMatchBoard = matchBoardRepository.findByRegist(findRegist)
                .orElseThrow(() -> new RuntimeException("해당 matchboard가 없습니다."));

        //joingame 생성
        registRepository.joinGameSave(JoinGame.createJoinGame(findMember,findRegist));

        findSchedule.addCurrentMemeber();
        findMatchBoard.addCurrentMember();

        // 모임이 성사되면 멤버 전원에게 보낸다.
        if(findSchedule.isMaxMember()){
            List<JoinGame>joinGames=joinGameRepository.findByRegist(findSchedule.getRegist());
            for(JoinGame j: joinGames) {
                registService.sendCompleteReply(j.getMember(),findSchedule.getParty());
            }
        }

        findMember.withdraw((int)findSchedule.toScheduleResponse().getNShotCredit());

        sendReply(findMember,Request.ACCEPT,findSchedule.getParty());

    }
    //용병신청 reject
    @Transactional
    public void rejectMatchApply(Long matchApplyId) {
        MatchApply findMatchApply = matchApplyRepository.findById(matchApplyId)
                .orElseThrow(() -> new RuntimeException("해당 apply가 없습니다."));
       findMatchApply.rejectMatchApply();
       sendReply(findMatchApply.getMember(),Request.REJECT,findMatchApply.getSchedule().getParty());
    }
    //용병신청 지원자에게 응답 결과 보내기
    public void sendReply(Member toMember, Request request, Party party){
        Reply reply= Reply.createReply(request,party);
        Notice notice = Notice.createNotice(toMember, NoticeType.MATCHREPLY, NoticeStatus.UNCONFIRM, LocalDateTime.now());
        notice.setReply(reply);
        notice.setApply(null);

        noticeRepository.saveNotice(notice);
        noticeRepository.saveReply(reply);
    }
    //자신이 참여하는 경기 리스트
    public List<MyGameResponse> getMyGameList() {
        return  joinGameRepository.findByMember(memberRepository.findOne(SecurityUtil.getCurrentMemberId())).stream()
                .map(JoinGame::toMyGameResponse).collect(Collectors.toList());
    }
    //이미 존재하는지?
    public Boolean isMatchBoard(Long scheduleId) {
        Schedule findSchedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(()-> new RuntimeException("해당 스케줄 없음"));
        Regist findRegist = findSchedule.getRegist();

        return matchBoardRepository.existsByRegist(findRegist);
    }
    //이미 존재하는지? 혹시나해서 만듬
    public Boolean isMatchApply(Long matchBoardId) {
        MatchBoard matchBoard = matchBoardRepository.findById(matchBoardId)
                .orElseThrow(()-> new RuntimeException("해당 매치보드 없음"));

        Regist findRegist = matchBoard.getRegist();

        Schedule findSchedule = scheduleRepository.findByRegist(findRegist)
                .orElseThrow(()-> new RuntimeException("해당 스케줄 없음"));

        Member findMember = memberRepository.findOne(SecurityUtil.getCurrentMemberId());

        return matchApplyRepository.existsByMemberAndSchedule(findMember,findSchedule);
    }
    public MatchBoard findMathBoard(Long matchBoardId){
        return matchBoardRepository.findById(matchBoardId).orElseThrow(()->new NotFoundEntityException("해당 스케줄 없음"));
    }
    public Schedule findScheduleByRegist(Regist regist){
        return scheduleRepository.findByRegist(regist).orElseThrow(()->new NotFoundEntityException("해당 스케줄 없음"));
    }

}
