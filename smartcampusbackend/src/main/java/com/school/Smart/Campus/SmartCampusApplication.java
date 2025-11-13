package com.school.Smart.Campus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SmartCampusApplication {

	public static void main(String[] args) {
		try {
		SpringApplication.run(SmartCampusApplication.class, args);
    } catch (Exception e) {
        e.printStackTrace(); 
    }
}
}
