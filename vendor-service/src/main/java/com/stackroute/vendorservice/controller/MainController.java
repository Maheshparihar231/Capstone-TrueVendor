package com.stackroute.vendorservice.controller;

import com.stackroute.vendorservice.service.VendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.stackroute.vendorservice.model.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.util.Locale.filter;
import static java.util.spi.ToolProvider.findFirst;

@RestController
@RequestMapping("/services")
class MainController {
    @Autowired
    private VendorService vendorService;

     @GetMapping("/Vendors")
    public List<Vendor> getAllVendors(){
         return this.vendorService.getAllVendor();
     }

     @PostMapping("/addvendor")
    public Vendor addvendor(@RequestBody Vendor vendor){
         return this.vendorService.addVendor(vendor);
     }

}

