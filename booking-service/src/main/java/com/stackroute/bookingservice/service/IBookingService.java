package com.stackroute.bookingservice.service;

import com.stackroute.bookingservice.exception.BookingAlreadyExistException;
import com.stackroute.bookingservice.exception.BookingNotFoundException;
import com.stackroute.bookingservice.exception.SlotAlreadyExistException;
import com.stackroute.bookingservice.exception.SlotNotFoundException;
import com.stackroute.bookingservice.model.BookingDetails;
import com.stackroute.bookingservice.model.BookingStatus;
import com.stackroute.bookingservice.model.CancelledBooking;
import com.stackroute.bookingservice.model.SlotDetails;

import java.util.Date;
import java.util.List;

public interface IBookingService {

    public SlotDetails saveSlotDetails(SlotDetails slot)throws SlotAlreadyExistException;
    public BookingDetails saveServiceBooking(BookingDetails booking, String slotId)
            throws BookingAlreadyExistException, SlotNotFoundException;
    public CancelledBooking cancelServiceBooking(String bookingId)throws BookingNotFoundException;
    public BookingDetails updateBooking(BookingDetails booking, String bookingId) throws BookingNotFoundException, SlotNotFoundException;
    public BookingDetails findByBookingId(String bookingId) throws BookingNotFoundException;
    public List<BookingDetails> findByVendorId(String vendorId) throws BookingNotFoundException;
    public List<SlotDetails> availableSlots(String serviceName)throws SlotNotFoundException;

    List<SlotDetails> allSlots(Date slotDate) throws SlotNotFoundException;

    public List<SlotDetails> vendorSlots(String vendorId) throws SlotNotFoundException;

    public SlotDetails deleteSlot(String slotId) throws SlotNotFoundException;

    public List<BookingDetails> findByCustomerId(String customerId) throws BookingNotFoundException;
    public List<BookingDetails>  finishedVendorBooking(String vendorId) throws BookingNotFoundException;
    public List<BookingDetails>  finishedCustomerBooking(String customerId) throws BookingNotFoundException;
    public  void  finishBooking(BookingDetails bookingDetails)throws BookingNotFoundException;
}
