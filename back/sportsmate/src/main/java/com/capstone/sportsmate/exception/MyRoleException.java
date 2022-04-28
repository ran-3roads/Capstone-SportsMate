package com.capstone.sportsmate.exception;

public class MyRoleException extends RuntimeException {
    public MyRoleException(String message, Throwable cause) {
        super(message, cause);
    }

    public MyRoleException(String message) {
        super(message);
    }

    public MyRoleException(Throwable cause) {
        super(cause);
    }
}