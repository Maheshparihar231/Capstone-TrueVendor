package com.stackroute.feedbackservice.repository;

import com.stackroute.feedbackservice.model.FeedBack;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface FeedBackRepository  extends MongoRepository<FeedBack,String> {
    Optional<FeedBack> findByBookingId(String bookingId);
}
