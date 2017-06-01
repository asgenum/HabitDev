package org.bsuir;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class HabitDevApplication {

	public static void main(String[] args) {
		SpringApplication.run(HabitDevApplication.class, args);
	}
}
