package com.bank.management.repository;
import com.bank.management.model.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;
public interface CustomerRepository
        extends MongoRepository<Customer, String> {
    Optional<Customer> findByAccountNumber(String accountNumber);
}