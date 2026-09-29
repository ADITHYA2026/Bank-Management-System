package com.bank.management.config;

import com.bank.management.model.Employee;
import com.bank.management.model.User;
import com.bank.management.repository.EmployeeRepository;
import com.bank.management.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {
    @Bean
    public CommandLineRunner initializeUsers(
            UserRepository userRepository,
            EmployeeRepository employeeRepository,
            PasswordEncoder passwordEncoder) {
        return args -> {
            // Create Manager
            User manager = userRepository
                    .findByUsername("manager")
                    .orElseGet(() -> new User(
                            null,
                            "manager",
                            passwordEncoder.encode("manager123"),
                            "MANAGER",
                            null
                    ));
            manager.setPassword(passwordEncoder.encode("manager123"));
            manager.setRole("MANAGER");
            userRepository.save(manager);
            System.out.println("Manager password reset: manager / manager123");
            // Create Employee 1
            Employee employee1 = employeeRepository
                    .findByEmployeeCode("EMP001")
                    .orElseGet(() -> {
                        Employee employee = new Employee(
                                null,
                                "Shiva Kumar",
                                "employee1@bank.com",
                                "9000000001",
                                "EMP001"
                        );
                        return employeeRepository.save(employee);
                    });
            if (userRepository.findByUsername("employee1").isEmpty()) {
                User employeeUser = new User(
                        null,
                        "employee1",
                        passwordEncoder.encode("employee123"),
                        "EMPLOYEE",
                        employee1.getId()
                );
                userRepository.save(employeeUser);
                System.out.println("Initial employee account created: employee1");
            }
            // Create Employee 2
            Employee employee2 = employeeRepository
                    .findByEmployeeCode("EMP002")
                    .orElseGet(() -> {
                        Employee employee = new Employee(
                                null,
                                "Ram Sagar",
                                "employee2@bank.com",
                                "9000000002",
                                "EMP002"
                        );
                        return employeeRepository.save(employee);
                    });
            if (userRepository.findByUsername("employee2").isEmpty()) {
                User employeeUser = new User(
                        null,
                        "employee2",
                        passwordEncoder.encode("employee456"),
                        "EMPLOYEE",
                        employee2.getId()
                );
                userRepository.save(employeeUser);
                System.out.println("Initial employee account created: employee2");
            }
        };
    }
}