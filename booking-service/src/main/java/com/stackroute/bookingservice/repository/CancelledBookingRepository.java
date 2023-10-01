package com.stackroute.bookingservice.repository;

import com.stackroute.bookingservice.model.CancelledBooking;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CancelledBookingRepository extends MongoRepository<CancelledBooking,String> {
}
