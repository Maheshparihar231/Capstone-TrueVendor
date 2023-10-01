package com.stackroute.bookingservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "There is no Slot available with this slot information")
public class SlotNotFoundException extends Exception{

    public SlotNotFoundException(String message) {
        super(message);
    }
}
