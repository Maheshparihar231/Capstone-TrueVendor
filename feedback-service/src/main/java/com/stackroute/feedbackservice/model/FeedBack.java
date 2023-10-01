package com.stackroute.feedbackservice.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Document(collection = "feedbacks")
public class FeedBack {
    @Id
    private String id;
    private String bookingId;
    private int rating;
    private String title;
    private String description;

}
