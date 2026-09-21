package com.bank.management.service;
import com.bank.management.model.Employee;
import com.bank.management.repository.EmployeeRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;
@Service
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }
    public Optional<Employee> getEmployeeById(String id) {
        return employeeRepository.findById(id);
    }
}