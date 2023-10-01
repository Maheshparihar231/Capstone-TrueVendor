package com.stackroute.feedbackservice.service;

import com.stackroute.feedbackservice.model.FeedBack;
import com.stackroute.feedbackservice.repository.FeedBackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeedBackService {
    @Autowired
    private FeedBackRepository feedBackRepository;

    public List<FeedBack> getAllFeedBacks(){
        return feedBackRepository.findAll();
    }

    public FeedBack getFeedbackById(String id) {
        return feedBackRepository.findById(id).orElse(null);
    }

    public FeedBack createFeedback(FeedBack feedback) {
        return feedBackRepository.save(feedback);
    }

    public FeedBack updateFeedback(String id, FeedBack updatedFeedback) {
        FeedBack existingFeedback = feedBackRepository.findById(id).orElse(null);
        if (existingFeedback != null) {
            existingFeedback.setBookingId(updatedFeedback.getBookingId());
            existingFeedback.setRating(updatedFeedback.getRating());
            existingFeedback.setTitle(updatedFeedback.getTitle());
            existingFeedback.setDescription(updatedFeedback.getDescription());
            return feedBackRepository.save(existingFeedback);
        }
        return null;
    }

    public FeedBack updateFeedbackByBookingId(String id, FeedBack updatedFeedback) {
        Optional<FeedBack> existingFeedback = feedBackRepository.findByBookingId(id);
        if (existingFeedback.isPresent()) {
            FeedBack newFeedback = existingFeedback.get();
            newFeedback.setBookingId(updatedFeedback.getBookingId());
            newFeedback.setRating(updatedFeedback.getRating());
            newFeedback.setTitle(updatedFeedback.getTitle());
            newFeedback.setDescription(updatedFeedback.getDescription());
            return feedBackRepository.save(newFeedback);
        }
        return null;
    }

    public void deleteFeedback(String id) {
        feedBackRepository.deleteById(id);
    }

    public Optional<FeedBack> getFeedbackByBookingId(String bookingId) {
        return feedBackRepository.findByBookingId(bookingId);
    }
}
