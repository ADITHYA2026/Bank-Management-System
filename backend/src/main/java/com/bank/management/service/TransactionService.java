package com.bank.management.service;
import com.bank.management.dto.DepositRequest;
import com.bank.management.dto.TransferRequest;
import com.bank.management.dto.WithdrawRequest;
import com.bank.management.model.Customer;
import com.bank.management.model.Transaction;
import com.bank.management.repository.CustomerRepository;
import com.bank.management.repository.EmployeeRepository;
import com.bank.management.repository.TransactionRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
@Service
public class TransactionService {
    private final CustomerRepository customerRepository;
    private final EmployeeRepository employeeRepository;
    private final TransactionRepository transactionRepository;
    public TransactionService(
            CustomerRepository customerRepository,
            EmployeeRepository employeeRepository,
            TransactionRepository transactionRepository) {
        this.customerRepository = customerRepository;
        this.employeeRepository = employeeRepository;
        this.transactionRepository = transactionRepository;
    }
    // =========================
    // DEPOSIT
    // =========================
    public Transaction deposit(DepositRequest request) {
        if (request.getAmount() <= 0) {
            throw new IllegalArgumentException(
                    "Deposit amount must be greater than zero");
        }
        validateEmployee(request.getEmployeeId());
        Customer customer = customerRepository
                .findById(request.getCustomerId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Customer not found"));
        customer.setBalance(
                customer.getBalance() + request.getAmount()
        );
        customerRepository.save(customer);
        Transaction transaction = new Transaction();
        transaction.setCustomerId(customer.getId());
        transaction.setEmployeeId(request.getEmployeeId());
        transaction.setType("DEPOSIT");
        transaction.setAmount(request.getAmount());
        transaction.setDescription(request.getDescription());
        transaction.setTimestamp(LocalDateTime.now());
        return transactionRepository.save(transaction);
    }
    // =========================
    // WITHDRAW
    // =========================
    public Transaction withdraw(WithdrawRequest request) {
        if (request.getAmount() <= 0) {
            throw new IllegalArgumentException(
                    "Withdrawal amount must be greater than zero");
        }
        validateEmployee(request.getEmployeeId());
        Customer customer = customerRepository
                .findById(request.getCustomerId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Customer not found"));
        if (customer.getBalance() < request.getAmount()) {
            throw new IllegalArgumentException(
                    "Insufficient balance");
        }
        customer.setBalance(
                customer.getBalance() - request.getAmount()
        );
        customerRepository.save(customer);
        Transaction transaction = new Transaction();
        transaction.setCustomerId(customer.getId());
        transaction.setEmployeeId(request.getEmployeeId());
        transaction.setType("WITHDRAW");
        transaction.setAmount(request.getAmount());
        transaction.setDescription(request.getDescription());
        transaction.setTimestamp(LocalDateTime.now());
        return transactionRepository.save(transaction);
    }
    // =========================
    // TRANSFER
    // =========================
    public Transaction transfer(TransferRequest request) {
        if (request.getAmount() <= 0) {
            throw new IllegalArgumentException(
                    "Transfer amount must be greater than zero");
        }
        if (request.getReceiverAccountNumber() == null ||
                request.getReceiverAccountNumber()
                        .trim()
                        .isEmpty()) {
            throw new IllegalArgumentException(
                    "Receiver account number is required");
        }
        validateEmployee(request.getEmployeeId());
        Customer sender = customerRepository
                .findById(request.getSenderCustomerId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Sender customer not found"));
        Customer receiver = customerRepository
                .findByAccountNumber(
                        request.getReceiverAccountNumber()
                )
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Receiver account not found"));
        if (sender.getId().equals(receiver.getId())) {
            throw new IllegalArgumentException(
                    "Sender and receiver cannot be the same");
        }
        if (sender.getBalance() < request.getAmount()) {
            throw new IllegalArgumentException(
                    "Insufficient balance");
        }
        sender.setBalance(
                sender.getBalance() - request.getAmount()
        );
        receiver.setBalance(
                receiver.getBalance() + request.getAmount()
        );
        customerRepository.save(sender);
        customerRepository.save(receiver);
        Transaction transaction = new Transaction();
        transaction.setEmployeeId(request.getEmployeeId());
        transaction.setType("TRANSFER");
        transaction.setAmount(request.getAmount());
        transaction.setSenderCustomerId(sender.getId());
        transaction.setReceiverCustomerId(receiver.getId());
        transaction.setDescription(request.getDescription());
        transaction.setTimestamp(LocalDateTime.now());
        return transactionRepository.save(transaction);
    }
    // =========================
    // GET CUSTOMER TRANSACTIONS
    // =========================
    public List<Transaction> getCustomerTransactions(String customerId) {
        List<Transaction> normalTransactions =
                transactionRepository.findByCustomerIdOrderByTimestampDesc(customerId);
        List<Transaction> transferTransactions =
                transactionRepository.findBySenderCustomerIdOrReceiverCustomerIdOrderByTimestampDesc(
                        customerId,
                        customerId
                );
        List<Transaction> allTransactions =
                new ArrayList<>(normalTransactions);
        allTransactions.addAll(transferTransactions);
        allTransactions.sort(
                (t1, t2) -> t2.getTimestamp().compareTo(t1.getTimestamp())
        );
        return allTransactions;
    }
    // =========================
    // EMPLOYEE VALIDATION
    // =========================
    private void validateEmployee(String employeeId) {
        if (employeeId == null ||
                employeeId.trim().isEmpty()) {
            throw new IllegalArgumentException(
                    "Employee ID is required");
        }
        employeeRepository
                .findById(employeeId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Employee not found"));
    }
}