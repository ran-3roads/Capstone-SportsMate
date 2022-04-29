package com.capstone.sportsmate.service;


import com.capstone.sportsmate.domain.Member;
import com.capstone.sportsmate.domain.RefreshToken;
import com.capstone.sportsmate.repository.MemberRepository;
import com.capstone.sportsmate.repository.RefreshTokenRepository;
import com.capstone.sportsmate.jwt.TokenProvider;
import com.capstone.sportsmate.util.SecurityUtil;
import com.capstone.sportsmate.web.LoginForm;
import com.capstone.sportsmate.web.MemberForm;
import com.capstone.sportsmate.jwt.TokenObject;
import com.capstone.sportsmate.web.MemberMoidfyForm;
import com.capstone.sportsmate.web.response.MemberResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;


    @Transactional
    public MemberResponse join (MemberForm memberForm){
        Member member = memberForm.toMember(passwordEncoder);
        validateDuplicateMember(member);//중복 회원 검증
       ;
        return  MemberResponse.of(memberRepository.save(member));
    }


    private Member findByEmail(String email){
        Member member =  memberRepository.findByEmail(email);
        return member;
    }
    // 현재 SecurityContext 에 있는 유저 정보 가져오기
    @Transactional(readOnly = true)
    public Member getMyInfo() {
        return memberRepository.findOne(SecurityUtil.getCurrentMemberId());

    }

    private void validateDuplicateMember(Member member) {
        Member findMember = memberRepository.findByEmail(member.getEmail());
        if(findMember!=null){
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        }
    }
    public Member findOne(Long memberId){
        return memberRepository.findOne(memberId);
    }

    //login service
    @Transactional
    public TokenObject login(LoginForm loginForm){
        // 1. Login ID/PW 를 기반으로 AuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken = loginForm.toAuthentication();
        // 2. 실제로 검증 (사용자 비밀번호 체크) 이 이루어지는 부분
        //    authenticate 메서드가 실행이 될 때 CustomUserDetailsService 에서 만들었던 loadUserByUsername 메서드가 실행됨
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        TokenObject tokenDto = tokenProvider.generateTokenDto(authentication);

        // 4. RefreshToken 저장
        RefreshToken refreshToken = RefreshToken.builder()
                .key(authentication.getName())
                .value(tokenDto.getRefreshToken())
                .accessToken(tokenDto.getAccessToken())
                .build();

        refreshTokenRepository.save(refreshToken);

        // 5. 토큰 발급
        return tokenDto;

    }
    @Transactional
    public String reissue(String accessToken, String refreshToken) {
        if (!tokenProvider.validateToken(refreshToken)) {
            throw new RuntimeException("Refresh Token 이 유효하지 않습니다.");
        }


        // 1. 저장소에서 Member ID 를 기반으로 Refresh Token 값 가져옴
        RefreshToken findRefreshToken = refreshTokenRepository.findByValue(refreshToken)
                .orElseThrow(() -> new RuntimeException("로그아웃 된 사용자입니다."));

        // 2. Access Token 에서 Member ID 가져오기
        Authentication authentication = tokenProvider.getAuthentication(findRefreshToken.getAccessToken());


        // 3. 새로운 토큰 생성
        TokenObject tokenDto = tokenProvider.generateTokenDto(authentication);

        // 4. refreshToken에 새로운 accessToken update  jpa에서는 자동으로 entity에반영하고 이를 영속함
        findRefreshToken.updateAccessToken(tokenDto.getAccessToken());


        // 토큰 발급
        return tokenDto.getAccessToken();
    }

    @Transactional
    public void logout(String accessToken, String refreshToken) {
        if (!tokenProvider.validateToken(refreshToken)) {
            throw new RuntimeException("Refresh Token 이 유효하지 않습니다.");
        }

        // 2. Access Token 에서 Member ID 가져오기
        Authentication authentication = tokenProvider.getAuthentication(accessToken);

        // 3. 저장소에서 Member ID 를 기반으로 Refresh Token 값 가져옴
        RefreshToken findRefreshToken = refreshTokenRepository.findByKey(authentication.getName())
                .orElseThrow(() -> new RuntimeException("로그아웃 된 사용자입니다."));


        // 4. Refresh Token 일치하는지 검사
        if (!findRefreshToken.getValue().equals(refreshToken)) {
            throw new RuntimeException("토큰의 유저 정보가 일치하지 않습니다.");
        }

        //토큰 제거
        refreshTokenRepository.delete(findRefreshToken);
        SecurityContextHolder.clearContext();

    }
    @Transactional
    public void deposit(int credit) {
        Member member = memberRepository.findOne(SecurityUtil.getCurrentMemberId());
        member.deposit(credit);
    }
    @Transactional
    public void withdraw(int credit) {
        Member member = memberRepository.findOne(SecurityUtil.getCurrentMemberId());
        member.withdraw(credit);
    }

    @Transactional
    public String modifyInfo(MemberMoidfyForm memberMoidfyForm) {//정보 변경
        Member findMember = memberRepository.findOne(SecurityUtil.getCurrentMemberId());
        findMember.updateFindMember(memberMoidfyForm);
        return "modify";
    }
}
