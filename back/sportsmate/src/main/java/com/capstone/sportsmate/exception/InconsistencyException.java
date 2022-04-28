package com.capstone.sportsmate.exception;

public class InconsistencyException extends RuntimeException{
    public InconsistencyException(String message, Throwable cause) {super(message, cause);}
    public InconsistencyException(String message) {
        super(message);
    }
    public InconsistencyException(Throwable cause) {
        super(cause);
    }
}
