package com.stackroute.vendorservice.service;

import com.stackroute.vendorservice.model.Vendor;
import com.stackroute.vendorservice.repository.VendorRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class VendorService {
    @Autowired
    private VendorRepository vendorRepository;
    public Vendor addVendor(Vendor vendor){
        return this.vendorRepository.save(vendor);
    }

    public List<Vendor> getAllVendor (){
        return this.vendorRepository.findAll();
    }


}
