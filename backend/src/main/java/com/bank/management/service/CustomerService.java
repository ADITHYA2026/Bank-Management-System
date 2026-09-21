package com.bank.management.service;
import com.bank.management.dto.UpdateCustomerRequest;
import com.bank.management.model.Customer;
import com.bank.management.repository.CustomerRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;
@Service
public class CustomerService {
    private final CustomerRepository customerRepository;
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }
    public Optional<Customer> getCustomerById(String id) {
        return customerRepository.findById(id);
    }
    public Optional<Customer> getCustomerByAccountNumber(
            String accountNumber) {
        return customerRepository.findByAccountNumber(accountNumber);
    }
    public Customer updateCustomer(
            String id,
            UpdateCustomerRequest request) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Customer not found"));
        if (request.getName() == null ||
                request.getName().trim().isEmpty()) {
            throw new IllegalArgumentException(
                    "Customer name is required");
        }
        if (request.getEmail() == null ||
                request.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException(
                    "Customer email is required");
        }
        if (request.getPhone() == null ||
                request.getPhone().trim().isEmpty()) {
            throw new IllegalArgumentException(
                    "Customer phone is required");
        }
        customer.setName(request.getName());
        customer.setEmail(request.getEmail());
        customer.setPhone(request.getPhone());
        return customerRepository.save(customer);
    }
}