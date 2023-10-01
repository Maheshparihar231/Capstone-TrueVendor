package com.stackroute.bookingservice.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalTime;
import java.util.Date;
import java.util.UUID;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Document(collection = "CancelledBooking")
public class CancelledBooking {
    @Id
    private String bookingId = UUID.randomUUID().toString();
    private String vendorId;
    private String customerId;
    private String customerName;
    private String vendorName;
    private String slotId;
    private String serviceType;
    private Date slotDate;
    private String customerAddress;
    private BookingStatus bookingStatus;
    private LocalTime startTime;
    private LocalTime endTime;
    private double visitingCharges;
}
