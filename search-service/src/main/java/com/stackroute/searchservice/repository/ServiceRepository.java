package com.stackroute.searchservice.repository;

import com.stackroute.searchservice.model.Service;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRepository extends ElasticsearchRepository<Service, String> {
    @Query("{\"bool\": {\"should\": [{\"match\": {\"name\": \"?0\"}},{\"match\": {\"location\": \"?0\"}}, {\"match\": {\"description\": \"?0\"}}]}}")
    SearchHits<Service> searchByProperty(String query);

}
