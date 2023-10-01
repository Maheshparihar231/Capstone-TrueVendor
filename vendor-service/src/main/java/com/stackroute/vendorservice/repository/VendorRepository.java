package com.stackroute.vendorservice.repository;

import com.stackroute.vendorservice.model.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VendorRepository extends JpaRepository<Vendor,String>{
}
