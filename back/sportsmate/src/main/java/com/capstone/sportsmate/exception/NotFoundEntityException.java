package com.capstone.sportsmate.exception;

public class NotFoundEntityException extends RuntimeException{
    public NotFoundEntityException(String message, Throwable cause) {super(message, cause);}
    public NotFoundEntityException(String message) {
        super(message);
    }
    public NotFoundEntityException(Throwable cause) {
        super(cause);
    }
}
