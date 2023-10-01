package com.stackroute.searchservice;

//import com.fasterxml.jackson.databind.ObjectMapper;
import com.stackroute.searchservice.controller.ServiceSearchController;
import com.stackroute.searchservice.model.Service;
import com.stackroute.searchservice.service.SearchService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//import org.springframework.data.elasticsearch.core.SearchHits;

import java.util.List;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@SpringBootTest
class SearchServiceApplicationTests {

	@Autowired
	private ServiceSearchController serviceSearchController;

	@MockBean
	private SearchService searchService;

	private MockMvc mockMvc;

	@Test
	void contextLoads() {
		// Ensure that the Spring Boot application context loads successfully
	}

	@Test
	void testSearchServicesByName() throws Exception {
		mockMvc = MockMvcBuilders.standaloneSetup(serviceSearchController).build();

		// Mock the behavior of the searchService
		List<Service> expectedServices = List.of(
				new Service( "Painter", "Service Description", "Warangal hanamkonda")
				// Add more services if needed
		);
		when(searchService.searchServices("Painter"))
				.thenReturn(expectedServices); // Replace with the expected result

		mockMvc.perform(MockMvcRequestBuilders.get("/search")
						.param("query", "Painter")
						.accept(MediaType.APPLICATION_JSON)) // Expect JSON response
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content()
						.json("[{\"name\":\"Painter\",\"description\":\"Service Description\",\"location\":\"Warangal hanamkonda\"}]"));
	}

	@Test
	void testSearchServicesByLocation() throws Exception {
		mockMvc = MockMvcBuilders.standaloneSetup(serviceSearchController).build();

		// Mock the behavior of the searchService
		List<Service> expectedServices = List.of(
				new Service( "Painter", "Service Description", "Warangal hanamkonda")
				// Add more services if needed
		);
		when(searchService.searchServices("Warangal"))
				.thenReturn(expectedServices); // Replace with the expected result

		mockMvc.perform(MockMvcRequestBuilders.get("/search")
						.param("query", "Warangal")
						.accept(MediaType.APPLICATION_JSON)) // Expect JSON response
				.andExpect(MockMvcResultMatchers.status().isOk())
				.andExpect(MockMvcResultMatchers.content()
						.json("[{\"name\":\"Painter\",\"description\":\"Service Description\",\"location\":\"Warangal hanamkonda\"}]"));
	}

//	@Test
//	void testGetAllServices() throws Exception {
//		// Mock the behavior of the searchService to return a list of services
//		List<Service> expectedServices = List.of(
//				new Service("Service Name", "Service Description", null),
//				new Service("Service 2", "Description for Service 2", null),
//				new Service("Plumbing", "All kinds of plumbing work done here", null),
//				new Service("Electrician", "All electricals are repaired here!", null),
//				new Service("Electrician", "All electricals are repaired here!", null),
//				new Service("Painter", "Service Description", "Warangal hanamkonda"),
//				new Service("Carpenter", "All types of carpenting works done here", "Hitech city , Hyderabad"),
//				new Service("Carpenter", "All types of carpenting works done here", "Patna , Bihar")
//		);
//		SearchHits<Service> searchHits = new SearchHits<>(expectedServices, null, 8);
//		when(searchService.searchByProperty(""))
//				.thenReturn(searchHits);
//
//		// Perform the GET request to the /services endpoint
//		mockMvc.perform(MockMvcRequestBuilders.get("/services")
//						.contentType(MediaType.APPLICATION_JSON))
//				.andExpect(MockMvcResultMatchers.status().isOk())
//				.andExpect(MockMvcResultMatchers.content()
//						.json(new ObjectMapper().writeValueAsString(searchHits)));
//
//		// Verify that the controller returns the expected list of services as JSON
//	}
}