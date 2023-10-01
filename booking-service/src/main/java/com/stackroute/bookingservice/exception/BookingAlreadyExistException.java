package com.stackroute.bookingservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT, reason = "with this slot id all bookings are done")
public class BookingAlreadyExistException extends Exception{

    public BookingAlreadyExistException(String message) {
        super(message);
    }
}
