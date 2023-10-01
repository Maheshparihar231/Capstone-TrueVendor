package com.stackroute.searchservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "services")
public class Service {
    @Id
    private String id;
    private String name;
    private String description;
    private String location;

    //getters
    public String getId(){
        return id;
    }
    public String getName(){
        return name;
    }
    public String getDescription(){
        return description;
    }
    public String getLocation(){ return location;}

    //setters
    public void setId(String id) {
        this.id = id;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public void setLocation(String location) {
        this.location = location;
    }


    public Service() {
        // Default constructor
    }

    public Service(String name, String description, String location) {
        this.name = name;
        this.description = description;
        this.location = location;
    }
}
