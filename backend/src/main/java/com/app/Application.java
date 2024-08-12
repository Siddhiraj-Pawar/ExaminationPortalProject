//
//package com.app;
//
//import org.springframework.boot.ApplicationRunner;
//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.context.annotation.Bean;
//
//import com.app.models.Role;
//import com.app.repository.RoleRepository;
//
//import java.util.Arrays;
//
//@SpringBootApplication
//public class Application {
//
//	public static void main(String[] args) {
//		SpringApplication.run(Application.class, args);
//	}
//
//	@Bean
//	public ApplicationRunner initializer(RoleRepository roleRepository) {
//		return args -> roleRepository.saveAll(Arrays.asList(
//				Role.builder().roleName("USER").roleDescription("Default Role provided to each user").build(),
//				Role.builder().roleName("ADMIN").roleDescription("Superuser, who has access for all functionality").build()));
//		
//		
//		
//	}
//}

//
package com.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.app.models.Role;
import com.app.repository.RoleRepository;
import com.app.servicesImplementation.InitializationService;

import java.util.Arrays;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Autowired
	private InitializationService initializationService;

	@Bean
	public ApplicationRunner initializer() {
		return args -> {
			initializationService.initialize();
		};
	}
}
