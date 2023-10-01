package com.stackroute.bookingservice.repository;

import com.stackroute.bookingservice.model.BookingDetails;
import com.stackroute.bookingservice.model.BookingStatus;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingDetailsRepository extends MongoRepository<BookingDetails, String> {
    List<BookingDetails> findByVendorId(String vendorId);

    List<BookingDetails> findByCustomerId(String customerId);

    List<BookingDetails> findByVendorIdAndBookingStatus(String vendorId,BookingStatus bookingStatus);
    List<BookingDetails> findByCustomerIdAndBookingStatus(String customerId,BookingStatus bookingStatus);
}
