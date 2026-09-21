package com.bank.management.service;

import com.bank.management.dto.ManagerDashboardResponse;
import com.bank.management.model.Customer;
import com.bank.management.model.Transaction;
import com.bank.management.repository.CustomerRepository;
import com.bank.management.repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ManagerService {

    private final CustomerRepository customerRepository;
    private final TransactionRepository transactionRepository;

    public ManagerService(
            CustomerRepository customerRepository,
            TransactionRepository transactionRepository) {

        this.customerRepository = customerRepository;
        this.transactionRepository = transactionRepository;
    }

    public ManagerDashboardResponse getDashboard() {

        List<Customer> customers =
                customerRepository.findAll();

        long totalCustomers = customers.size();

        long totalTransactions =
                transactionRepository.count();

        double totalBalance = customers.stream()
                .mapToDouble(Customer::getBalance)
                .sum();

        return new ManagerDashboardResponse(
                totalCustomers,
                totalTransactions,
                totalBalance
        );
    }

    public List<Customer> getAllCustomers() {

        return customerRepository.findAll();
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAllByOrderByTimestampDesc();
    }
}