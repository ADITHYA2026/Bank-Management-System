package com.bank.management.repository;
import com.bank.management.model.Employee;
import org.springframework.data.mongodb.repository.MongoRepository;
public interface EmployeeRepository extends MongoRepository<Employee, String> {
}