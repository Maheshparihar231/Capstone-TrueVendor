package com.stackroute.bookingservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "There is already a slot available with this Information")
public class SlotAlreadyExistException extends Exception{

    public SlotAlreadyExistException(String message) {
        super(message);
    }
}
