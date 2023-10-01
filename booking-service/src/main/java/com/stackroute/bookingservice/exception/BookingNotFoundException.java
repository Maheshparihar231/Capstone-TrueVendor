package com.stackroute.bookingservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "There is no Booking available with this Booking Id")
public class BookingNotFoundException extends Exception{

    public BookingNotFoundException(String message) {
        super(message);
    }
}
