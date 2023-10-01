package com.stackroute.bookingservice.controller;

import com.stackroute.bookingservice.exception.BookingAlreadyExistException;
import com.stackroute.bookingservice.exception.BookingNotFoundException;
import com.stackroute.bookingservice.exception.SlotAlreadyExistException;
import com.stackroute.bookingservice.exception.SlotNotFoundException;
import com.stackroute.bookingservice.model.BookingDetails;
import com.stackroute.bookingservice.model.SlotDetails;
import com.stackroute.bookingservice.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/api/v/booking")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @PostMapping("/saveSlotDetails")
    public ResponseEntity<?> saveSlotDetails(@RequestBody SlotDetails slot) throws SlotAlreadyExistException {
        return new ResponseEntity<>(bookingService.saveSlotDetails(slot), HttpStatus.CREATED);
    }
    @PostMapping("/saveBooking/{slotId}")
    public ResponseEntity<?> saveBookingDetails(@RequestBody BookingDetails booking, @PathVariable("slotId") String slotId)throws BookingAlreadyExistException, SlotNotFoundException {
        return  new ResponseEntity<>(bookingService.saveServiceBooking(booking,slotId),HttpStatus.CREATED);
    }
    @DeleteMapping("/cancelBooking/{bookingId}")
    public ResponseEntity<?> cancelBooking(@PathVariable("bookingId") String bookingId)throws BookingNotFoundException{
        return new ResponseEntity<>(bookingService.cancelServiceBooking(bookingId),HttpStatus.OK);
    }
    @PutMapping("/updateBooking/{bookingId}")
    public  ResponseEntity<?> updateBooking(@RequestBody BookingDetails bookingDetails,@PathVariable("bookingId") String bookingId) throws BookingNotFoundException, SlotNotFoundException {
        return new ResponseEntity<>(bookingService.updateBooking(bookingDetails,bookingId),HttpStatus.OK);
    }

    @GetMapping("/findByBookingId/{bookingId}")
    public ResponseEntity<?> findByBookingId(@PathVariable("bookingId") String bookingId)throws BookingNotFoundException{
        return new ResponseEntity<>(bookingService.findByBookingId(bookingId),HttpStatus.OK);
    }
    @GetMapping("/findByVendorId/{vendorId}")
    public ResponseEntity<?> findByVendorId(@PathVariable("vendorId") String vendorId)throws BookingNotFoundException{
        return new ResponseEntity<>(bookingService.findByVendorId(vendorId),HttpStatus.OK);
    }
    @GetMapping("/findByCustomerId/{customerId}")
    public ResponseEntity<?> findByCustomerId(@PathVariable("customerId") String customerId)throws BookingNotFoundException{
        return new ResponseEntity<>(bookingService.findByCustomerId(customerId),HttpStatus.OK);
    }

    @GetMapping("/availableSlots/{serviceName}")
    public ResponseEntity<?> availableSlots(@PathVariable("serviceName") String serviceName)throws SlotNotFoundException{
        List<SlotDetails> slots=bookingService.availableSlots(serviceName);
        return new ResponseEntity<>(slots,HttpStatus.OK);
    }
    @GetMapping("/getSlotsByDate/{slotDate}")
    public ResponseEntity<?> getSlotsByDate(@PathVariable("value=slotDate") Date slotDate) throws SlotNotFoundException{
        List<SlotDetails> slots=bookingService.allSlots(slotDate);
        return new ResponseEntity<>(slots,HttpStatus.OK);

    }
    @GetMapping("/slotsBy/{vendorId}")
    public ResponseEntity<?> vendorSlots(@PathVariable("vendorId") String vendorId)throws SlotNotFoundException{
        return new ResponseEntity<>(bookingService.vendorSlots(vendorId),HttpStatus.OK);
    }
    @DeleteMapping("/deleteSlot/{slotId}")
    public ResponseEntity<?> deleteSlot(@PathVariable("slotId") String slotId) throws SlotNotFoundException {
        return  new ResponseEntity<>(bookingService.deleteSlot(slotId),HttpStatus.OK);
    }
    @PutMapping("/finish")
    public void FinishBooking(@RequestBody BookingDetails bookingDetails)throws BookingNotFoundException{
        bookingService.finishBooking(bookingDetails);
    }
    @GetMapping("/finished/{vendorId}")
    public ResponseEntity<?> getFinishedVendorBooking(@PathVariable("vendorId") String vendorId) throws BookingNotFoundException{
        return new ResponseEntity<>(bookingService.finishedVendorBooking(vendorId),HttpStatus.OK);
    }

    @GetMapping("/finishedCustomer/{customerId}")
    public ResponseEntity<?> getFinishedBooking(@PathVariable("customerId") String customerId) throws BookingNotFoundException{
        return new ResponseEntity<>(bookingService.finishedCustomerBooking(customerId),HttpStatus.OK);
    }
}
//
//add slots
//{
//    "vendorId":"28",
//    "vendorName":"jack",
//    "slotDate":"2023-09-17",
//    "serviceName":"repairing",
//    "startTime":"01:00",
//    "endTime":"04:00",
//    "vendorLocation":"delhi",
//    "visitingCharges":"200"
//    }
//    4:57
//    add booking
//    {
//    "customerId":"34",
//    "customerName":"rahul",
//    "customerAddress":"address"
//    }