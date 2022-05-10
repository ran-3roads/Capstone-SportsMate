package com.capstone.sportsmate.controller;

import com.capstone.sportsmate.exception.AlreadyExistException;
import com.capstone.sportsmate.exception.RegistException;
import com.capstone.sportsmate.exception.response.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    //금액 부족할때
    @ExceptionHandler(RegistException.class)
    public ResponseEntity<ErrorResponse> creditException(RegistException e){
        ErrorResponse response = new ErrorResponse();
        response.setStatusCode(HttpStatus.FORBIDDEN.value());
        response.setMessage(e.getMessage());
        response.setTimestamp(System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
    }
    //이미 존재할때
    @ExceptionHandler(AlreadyExistException.class)
    public ResponseEntity<ErrorResponse> alreadyExistException(AlreadyExistException e){
        ErrorResponse response = new ErrorResponse();
        response.setStatusCode(HttpStatus.METHOD_NOT_ALLOWED.value());
        response.setMessage(e.getMessage());
        response.setTimestamp(System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.METHOD_NOT_ALLOWED);
    }

}
