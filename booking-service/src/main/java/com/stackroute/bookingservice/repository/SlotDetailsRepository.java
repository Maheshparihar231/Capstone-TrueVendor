package com.stackroute.bookingservice.repository;

import com.stackroute.bookingservice.model.SlotDetails;
import com.stackroute.bookingservice.model.SlotStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.Date;
import java.util.List;

@Repository
public interface SlotDetailsRepository extends MongoRepository<SlotDetails, String> {
    SlotDetails findByVendorIdAndSlotDateAndStartTimeAndEndTime(String vendorId, Date slotDate, LocalTime startTime, LocalTime endTime);
//    List<SlotDetails> findBySlotStatus(SlotStatus slotStatus);
    List<SlotDetails> findByServiceNameAndSlotStatus(String serviceName, SlotStatus slotStatus);

    List<SlotDetails> findByVendorId(String vendorId, SlotStatus available);

    List<SlotDetails> findBySlotDateAndServiceName(Date slotDate, SlotStatus available);

    SlotDetails findBySlotIdAndSlotStatus(String slotId, SlotStatus slotStatus);
}
