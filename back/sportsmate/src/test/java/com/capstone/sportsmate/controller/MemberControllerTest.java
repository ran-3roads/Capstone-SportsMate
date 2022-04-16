package com.capstone.sportsmate.controller;

import com.capstone.sportsmate.web.LoginForm;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
public class MemberControllerTest {

    @Autowired
    MockMvc mockMvc;


//로그인 기능 테스트
    @Test
    public void testLogin() throws Exception{
        LoginForm loginForm = new LoginForm();
        loginForm.setEmail("test7@test7.com");
        loginForm.setPassword("1234");
        mockMvc.perform(post("/sportsmate/member/public/login")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .characterEncoding("UTF-8")
                .content(new ObjectMapper().writeValueAsBytes(loginForm))) //post요청과 실을 내용
                .andDo(print())// response 내용 출력
                .andExpect(status().is(200)); // 코드 200 인지 확인
    }

}
