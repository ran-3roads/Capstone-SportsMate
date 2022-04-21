package com.capstone.sportsmate.exception.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ErrorResponse {
    private int statusCode;

    private String message;

    private long timestamp;
}
