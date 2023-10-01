package com.stackroute.searchservice.controller;
import com.stackroute.searchservice.model.Service;
import com.stackroute.searchservice.repository.ServiceRepository;
import com.stackroute.searchservice.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/findservice")
public class ServiceSearchController{
    @Autowired
    private KafkaTemplate<String,String> kafkaTemplate;
//    private final SearchService searchService;
//    private final ServiceRepository serviceRepository;
//    @Autowired
//    public ServiceSearchController(SearchService searchService, ServiceRepository serviceRepository) {
//        this.searchService = searchService;
//        this.serviceRepository = serviceRepository;
//    }


    @Autowired
    private  SearchService searchService;

    @Autowired
    private ServiceRepository serviceRepository;

    @GetMapping("/services")
    public Iterable<Service> getAllServices() {
        // Fetch and return all services from Elasticsearch
        return serviceRepository.findAll();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteService(@RequestParam String id){
        serviceRepository.deleteById(id);
    }

    @PostMapping("/save")
    public Service addService(@RequestBody Service service){
        return this.searchService.addService(service);
    }

    @GetMapping("/search")
    public Iterable<Service> searchServices(@RequestParam String query) {
        return searchService.searchServices(query);
    }

//    @GetMapping("/kafka")
//    public void kafkaMessage(){
//        kafkaTemplate.send("service-details-topic","service name");
//    }
}