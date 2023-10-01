package com.stackroute.bookingservice.service;

import com.stackroute.bookingservice.exception.BookingAlreadyExistException;
import com.stackroute.bookingservice.exception.BookingNotFoundException;
import com.stackroute.bookingservice.exception.SlotAlreadyExistException;
import com.stackroute.bookingservice.exception.SlotNotFoundException;
import com.stackroute.bookingservice.model.*;
import com.stackroute.bookingservice.repository.BookingDetailsRepository;
import com.stackroute.bookingservice.repository.CancelledBookingRepository;
import com.stackroute.bookingservice.repository.SlotDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class BookingService implements IBookingService{
    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;
    @Autowired
    private SlotDetailsRepository slotDetailsRepository;
    @Autowired
    private BookingDetailsRepository bookingDetailsRepository;
    @Autowired
    private CancelledBookingRepository cancelledBookingRepository;
    @Override
    public SlotDetails saveSlotDetails(SlotDetails slot) throws SlotAlreadyExistException {
        SlotDetails s = slotDetailsRepository.findByVendorIdAndSlotDateAndStartTimeAndEndTime(slot.getVendorId(),slot.getSlotDate(),slot.getStartTime(),slot.getEndTime());
        if(s==null){
            slot.setSlotStatus(SlotStatus.AVAILABLE);
            System.out.println(slot.getSlotDate());
            return slotDetailsRepository.save(slot);
        }else
            throw new SlotAlreadyExistException("Slot already exist");
    }

    @Override
    public BookingDetails saveServiceBooking(BookingDetails booking, String slotId) throws BookingAlreadyExistException, SlotNotFoundException {
        SlotDetails s = slotDetailsRepository.findById(slotId).orElse(null);
        if(s!=null) {
            if(s.getSlotStatus()==SlotStatus.AVAILABLE){
            BookingDetails bookedService = bookingDetailsRepository.findById(booking.getBookingId()).orElse(null);
            if (bookedService == null) {
                booking.setBookingStatus(BookingStatus.BOOKED);
                booking.setVendorId(s.getVendorId());
                booking.setVendorName(s.getVendorName());
                booking.setSlotId(s.getSlotId());
                booking.setSlotDate(s.getSlotDate());
                booking.setServiceName(s.getServiceName());
                booking.setStartTime(s.getStartTime());
                booking.setEndTime(s.getEndTime());
                booking.setVisitingCharges(s.getVisitingCharges());
                s.setSlotStatus(SlotStatus.NOT_AVAILABLE);
                slotDetailsRepository.save(s);
                //this.kafkaTemplate.send("booking-details-topic", String.valueOf(booking.getBookingStatus()));
                return bookingDetailsRepository.save(booking);
            }else
                throw new BookingAlreadyExistException("Booking already exist by this id");
            } else
                throw new BookingAlreadyExistException("This slot is already booked");
        }else
            throw new SlotNotFoundException("Slot not found");
    }

    @Override
    public CancelledBooking cancelServiceBooking(String bookingId) throws BookingNotFoundException {
        BookingDetails booking = bookingDetailsRepository.findById(bookingId).orElse(null);
        CancelledBooking cancelledBooking = new CancelledBooking();
        if(booking!=null){
            booking.setBookingStatus(BookingStatus.CANCELLED);
            SlotDetails slot = slotDetailsRepository.findById(booking.getSlotId()).orElse(null);
            slot.setSlotStatus(SlotStatus.AVAILABLE);
            cancelledBooking.setBookingId(booking.getBookingId());
            cancelledBooking.setVendorId(booking.getVendorId());
            cancelledBooking.setCustomerId(booking.getCustomerId());
            cancelledBooking.setCustomerName(booking.getCustomerName());
            cancelledBooking.setSlotId(booking.getSlotId());
            cancelledBooking.setServiceType(booking.getServiceName());
            cancelledBooking.setSlotDate(booking.getSlotDate());
            cancelledBooking.setCustomerAddress(booking.getCustomerAddress());
            cancelledBooking.setBookingStatus(booking.getBookingStatus());
            cancelledBooking.setStartTime(booking.getStartTime());
            cancelledBooking.setEndTime(booking.getEndTime());
            cancelledBooking.setVisitingCharges(booking.getVisitingCharges());
            slotDetailsRepository.save(slot);
            bookingDetailsRepository.deleteById(bookingId);
            //kafkaTemplate.send("booking-details-topic", String.valueOf(cancelledBooking.getBookingStatus()));
            return cancelledBookingRepository.save(cancelledBooking);
        }else
            throw new BookingNotFoundException("No booking found to delete");
    }

    @Override
    public BookingDetails updateBooking(BookingDetails bookingDetails,String bookingId) throws BookingNotFoundException, SlotNotFoundException {
        SlotDetails s = slotDetailsRepository.findByVendorIdAndSlotDateAndStartTimeAndEndTime(bookingDetails.getVendorId(),bookingDetails.getSlotDate(),bookingDetails.getStartTime(),bookingDetails.getEndTime());
        if(s!=null&&s.getSlotStatus()==SlotStatus.AVAILABLE) {
            BookingDetails booking = bookingDetailsRepository.findById(bookingId).orElse(null);
            if (booking != null) {
                SlotDetails slot = slotDetailsRepository.findById(booking.getSlotId()).get();
                booking.setBookingStatus(BookingStatus.BOOKED);
                booking.setVendorId(s.getVendorId());
                booking.setVendorName(s.getVendorName());
                booking.setSlotId(s.getSlotId());
                booking.setSlotDate(s.getSlotDate());
                booking.setServiceName(s.getServiceName());
                booking.setStartTime(s.getStartTime());
                booking.setEndTime(s.getEndTime());
                booking.setVisitingCharges(s.getVisitingCharges());
                s.setSlotStatus(SlotStatus.NOT_AVAILABLE);
                slot.setSlotStatus(SlotStatus.AVAILABLE);
                slotDetailsRepository.save(s);
                slotDetailsRepository.save(slot);
                return bookingDetailsRepository.save(booking);
            } else
                throw new BookingNotFoundException("No booking to update for this id");
        }else
            throw new SlotNotFoundException("Slot not available");
    }

    @Override
    public BookingDetails findByBookingId(String bookingId) throws BookingNotFoundException {
        BookingDetails booking = bookingDetailsRepository.findById(bookingId).orElse(null);
        if(booking!=null){
            return booking;
        }else
            throw new BookingNotFoundException("Booking not found");
    }

    @Override
    public List<BookingDetails> findByVendorId(String vendorId) throws BookingNotFoundException {
        List<BookingDetails> bookings = bookingDetailsRepository.findByVendorIdAndBookingStatus(vendorId,BookingStatus.BOOKED);
        if(!bookings.isEmpty()){
            return bookings;
        }else
            throw new BookingNotFoundException("No bookings for you");
    }
    @Override
    public List<BookingDetails> findByCustomerId(String customerId) throws BookingNotFoundException {
        List<BookingDetails> bookings = bookingDetailsRepository.findByCustomerIdAndBookingStatus(customerId,BookingStatus.BOOKED);
        if(!bookings.isEmpty()){
            return bookings;
        }else
            throw new BookingNotFoundException("Not booked any service");
    }

    @Override
    public List<BookingDetails> finishedVendorBooking(String vendorId) throws BookingNotFoundException {
        List<BookingDetails> bookings = bookingDetailsRepository.findByVendorIdAndBookingStatus(vendorId, BookingStatus.FINISHED);
        if(!bookings.isEmpty()){
            return bookings;
        }else
            throw new BookingNotFoundException("Booking not found");
    }

    @Override
    public List<BookingDetails> finishedCustomerBooking(String customerId) throws BookingNotFoundException {
        List<BookingDetails> bookings = bookingDetailsRepository.findByCustomerIdAndBookingStatus(customerId, BookingStatus.FINISHED);
        if(!bookings.isEmpty()){
            return bookings;
        }else
            throw new BookingNotFoundException("Booking not found");
    }
    @Override
    public  void finishBooking(BookingDetails bookingDetails) throws BookingNotFoundException{
        BookingDetails booking = bookingDetailsRepository.findById(bookingDetails.getBookingId()).orElse(null);
        if(booking!=null){
            booking.setBookingStatus(BookingStatus.FINISHED);
            bookingDetailsRepository.save(booking);
        }else
            throw  new BookingNotFoundException("booking not found");
    }

    @Override
    public List<SlotDetails> availableSlots(String serviceName) throws SlotNotFoundException {
        List<SlotDetails> slots = slotDetailsRepository.findByServiceNameAndSlotStatus(serviceName,SlotStatus.AVAILABLE);
        if(!slots.isEmpty()){
            return slots;
        }else
            throw new SlotNotFoundException("No available slot for this service");
    }

    @Override
    public List<SlotDetails> allSlots(Date slotDate) throws SlotNotFoundException {
        List<SlotDetails> slots = slotDetailsRepository.findBySlotDateAndServiceName(slotDate,SlotStatus.AVAILABLE);
        if(!slots.isEmpty()){
            return slots;
        }else
            throw new SlotNotFoundException("No slots available for this date");
    }

    public List<SlotDetails> vendorSlots(String vendorId) throws SlotNotFoundException{
        List<SlotDetails> slots = slotDetailsRepository.findByVendorId(vendorId,SlotStatus.AVAILABLE);
        if(!slots.isEmpty()){
            return slots;
        }else
            throw new SlotNotFoundException("You have not added any slot");
    }

    public SlotDetails deleteSlot(String slotId) throws SlotNotFoundException{
        SlotDetails slot = slotDetailsRepository.findBySlotIdAndSlotStatus(slotId,SlotStatus.AVAILABLE);
        if (slot!=null){
            slotDetailsRepository.deleteById(slotId);
            return slot;
        }else
            throw new SlotNotFoundException("No slot available to delete");
    }

}
