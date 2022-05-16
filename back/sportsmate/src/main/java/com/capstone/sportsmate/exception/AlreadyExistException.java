package com.capstone.sportsmate.exception;

public class AlreadyExistException extends IllegalStateException{
    public AlreadyExistException(String message, Throwable cause) {super(message, cause);}
    public AlreadyExistException(String message) {super(message);}
    public AlreadyExistException(Throwable cause) {super(cause);}
}
