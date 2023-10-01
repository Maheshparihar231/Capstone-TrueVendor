package com.stackroute.searchservice.service;

import com.stackroute.searchservice.model.Service;
import com.stackroute.searchservice.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.SearchHit;



@org.springframework.stereotype.Service
public class SearchService {
    private final ServiceRepository serviceRepository;

    @Autowired
    public SearchService(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public Iterable<Service> searchServices(String query) {
        SearchHits<Service> searchHits = serviceRepository.searchByProperty(query);

        return searchHits.stream().map(SearchHit::getContent).toList();
    }

    public Service addService( Service service){

        return serviceRepository.save(service);
    }
}