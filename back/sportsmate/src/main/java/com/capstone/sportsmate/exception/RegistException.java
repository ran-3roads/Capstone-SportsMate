package com.capstone.sportsmate.exception;

public class RegistException extends RuntimeException{
    public RegistException(String message, Throwable cause) {
        super(message, cause);
    }

    public RegistException(String message) {
        super(message);
    }

    public RegistException(Throwable cause) {
        super(cause);
    }
}
