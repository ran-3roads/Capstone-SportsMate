package com.capstone.sportsmate.web;

import com.capstone.sportsmate.domain.Sex;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

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

}
