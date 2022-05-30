package com.capstone.sportsmate.web;

import com.capstone.sportsmate.domain.status.Authority;
import com.capstone.sportsmate.domain.Member;
import com.capstone.sportsmate.domain.status.Sex;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;


@Getter
@Setter
public class MemberForm {

    private String name;

    private Sex sex;

    private String email;

    private String nickName;

    private String password;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthDate;

    private String phoneNumber;

    private Long kakaoId;

    public Member toMember(PasswordEncoder passwordEncoder) {
        return Member.createMember(name,sex, email, nickName, passwordEncoder.encode(password),
                LocalDate.now(), birthDate, phoneNumber,Authority.ROLE_USER);
    }
}
