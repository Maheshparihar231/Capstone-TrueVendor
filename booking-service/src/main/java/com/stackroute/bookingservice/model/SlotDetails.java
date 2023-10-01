package com.stackroute.bookingservice.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.UUID;
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Document(collection = "slots")
public class SlotDetails {
    @Id
    private String slotId = UUID.randomUUID().toString();
    private String vendorId;
    private String vendorName;
    private Date slotDate;
    private SlotStatus slotStatus;
    private String serviceName;
    private LocalTime startTime;
    private LocalTime endTime;
    private String vendorLocation;
    private double visitingCharges;
}
