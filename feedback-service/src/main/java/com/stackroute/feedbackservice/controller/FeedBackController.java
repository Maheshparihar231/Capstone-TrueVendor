package com.stackroute.feedbackservice.controller;

import com.stackroute.feedbackservice.model.FeedBack;
import com.stackroute.feedbackservice.service.FeedBackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/feedback")
public class FeedBackController {

    @Autowired
    private FeedBackService feedBackService;

    @GetMapping
    public ResponseEntity<List<FeedBack>> getAllFeedback() {
        List<FeedBack> feedbackList = feedBackService.getAllFeedBacks();
        return new ResponseEntity<>(feedbackList, HttpStatus.OK);
    }


    @GetMapping("/{id}")
    public ResponseEntity<FeedBack> getFeedbackById(@PathVariable String id) {
        FeedBack feedback = feedBackService.getFeedbackById(id);
        if (feedback != null) {
            return new ResponseEntity<>(feedback, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<FeedBack> createFeedback(@RequestBody FeedBack feedback) {
        FeedBack createdFeedback = feedBackService.createFeedback(feedback);
        return new ResponseEntity<>(createdFeedback, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FeedBack> updateFeedback(@PathVariable String id, @RequestBody FeedBack feedback) {
        FeedBack updatedFeedback = feedBackService.updateFeedback(id, feedback);
        if (updatedFeedback != null) {
            return new ResponseEntity<>(updatedFeedback, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable String id) {
        feedBackService.deleteFeedback(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/booking/{bookingId}")
    public ResponseEntity<FeedBack> getFeedbackByBookingId(@PathVariable String bookingId) {
        Optional<FeedBack> feedBack = feedBackService.getFeedbackByBookingId(bookingId);
        return feedBack.map(ResponseEntity::ok).orElseGet(()->ResponseEntity.notFound().build());
    }

    @PutMapping("/booking/{bookingId}")
    public ResponseEntity<FeedBack> updateUserByUserId(@PathVariable String bookingId , @RequestBody FeedBack feedBack){
        FeedBack feedBack1 = feedBackService.updateFeedbackByBookingId(bookingId,feedBack);
        return feedBack1 !=null ? ResponseEntity.ok(feedBack1):ResponseEntity.notFound().build();
    }

}
