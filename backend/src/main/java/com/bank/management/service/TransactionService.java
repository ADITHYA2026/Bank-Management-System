package com.bank.management.service;
import com.bank.management.dto.DepositRequest;
import com.bank.management.dto.TransferRequest;
import com.bank.management.dto.UpdateTransactionRequest;
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
    // =========================================================
    // DEPOSIT
    // =========================================================
    public Transaction deposit(
            DepositRequest request) {
        if (request.getAmount() <= 0) {
            throw new IllegalArgumentException(
                    "Deposit amount must be greater than zero"
            );
        }
        validateEmployee(
                request.getEmployeeId()
        );
        Customer customer =
                customerRepository
                        .findById(
                                request.getCustomerId()
                        )
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Customer not found"
                                )
                        );
        customer.setBalance(
                customer.getBalance()
                        + request.getAmount()
        );
        customerRepository.save(customer);
        Transaction transaction =
                new Transaction();
        transaction.setCustomerId(
                customer.getId()
        );
        transaction.setEmployeeId(
                request.getEmployeeId()
        );
        transaction.setType(
                "DEPOSIT"
        );
        transaction.setAmount(
                request.getAmount()
        );
        transaction.setDescription(
                request.getDescription()
        );
        transaction.setTimestamp(
                LocalDateTime.now()
        );
        transaction.setStatus(
                "ACTIVE"
        );
        return transactionRepository.save(
                transaction
        );
    }
    // =========================================================
    // WITHDRAW
    // =========================================================
    public Transaction withdraw(
            WithdrawRequest request) {
        if (request.getAmount() <= 0) {
            throw new IllegalArgumentException(
                    "Withdrawal amount must be greater than zero"
            );
        }
        validateEmployee(
                request.getEmployeeId()
        );
        Customer customer =
                customerRepository
                        .findById(
                                request.getCustomerId()
                        )
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Customer not found"
                                )
                        );
        if (customer.getBalance()
                < request.getAmount()) {
            throw new IllegalArgumentException(
                    "Insufficient balance"
            );
        }
        customer.setBalance(
                customer.getBalance()
                        - request.getAmount()
        );
        customerRepository.save(customer);
        Transaction transaction =
                new Transaction();
        transaction.setCustomerId(
                customer.getId()
        );
        transaction.setEmployeeId(
                request.getEmployeeId()
        );
        transaction.setType(
                "WITHDRAW"
        );
        transaction.setAmount(
                request.getAmount()
        );
        transaction.setDescription(
                request.getDescription()
        );
        transaction.setTimestamp(
                LocalDateTime.now()
        );
        transaction.setStatus(
                "ACTIVE"
        );
        return transactionRepository.save(
                transaction
        );
    }
    // =========================================================
    // TRANSFER
    // =========================================================
    public Transaction transfer(
            TransferRequest request) {
        if (request.getAmount() <= 0) {
            throw new IllegalArgumentException(
                    "Transfer amount must be greater than zero"
            );
        }
        if (request.getReceiverAccountNumber() == null ||
                request.getReceiverAccountNumber()
                        .trim()
                        .isEmpty()) {
            throw new IllegalArgumentException(
                    "Receiver account number is required"
            );
        }
        validateEmployee(
                request.getEmployeeId()
        );
        Customer sender =
                customerRepository
                        .findById(
                                request.getSenderCustomerId()
                        )
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Sender customer not found"
                                )
                        );
        Customer receiver =
                customerRepository
                        .findByAccountNumber(
                                request.getReceiverAccountNumber()
                        )
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Receiver account not found"
                                )
                        );
        if (sender.getId()
                .equals(receiver.getId())) {
            throw new IllegalArgumentException(
                    "Sender and receiver cannot be the same"
            );
        }
        if (sender.getBalance()
                < request.getAmount()) {
            throw new IllegalArgumentException(
                    "Insufficient balance"
            );
        }
        sender.setBalance(
                sender.getBalance()
                        - request.getAmount()
        );
        receiver.setBalance(
                receiver.getBalance()
                        + request.getAmount()
        );
        customerRepository.save(sender);
        customerRepository.save(receiver);
        Transaction transaction =
                new Transaction();
        transaction.setEmployeeId(
                request.getEmployeeId()
        );
        transaction.setType(
                "TRANSFER"
        );
        transaction.setAmount(
                request.getAmount()
        );
        transaction.setSenderCustomerId(
                sender.getId()
        );
        transaction.setReceiverCustomerId(
                receiver.getId()
        );
        transaction.setDescription(
                request.getDescription()
        );
        transaction.setTimestamp(
                LocalDateTime.now()
        );
        transaction.setStatus(
                "ACTIVE"
        );
        return transactionRepository.save(
                transaction
        );
    }
    // =========================================================
    // GET CUSTOMER TRANSACTIONS
    // =========================================================
    public List<Transaction> getCustomerTransactions(
            String customerId) {
        List<Transaction> normalTransactions =
                transactionRepository
                        .findByCustomerIdOrderByTimestampDesc(
                                customerId
                        );
        List<Transaction> transferTransactions =
                transactionRepository
                        .findBySenderCustomerIdOrReceiverCustomerIdOrderByTimestampDesc(
                                customerId,
                                customerId
                        );
        List<Transaction> allTransactions =
                new ArrayList<>(
                        normalTransactions
                );
        allTransactions.addAll(
                transferTransactions
        );
        allTransactions.sort(
                (t1, t2) ->
                        t2.getTimestamp()
                                .compareTo(
                                        t1.getTimestamp()
                                )
        );
        return allTransactions;
    }
    // =========================================================
    // UPDATE TRANSACTION
    //
    // OLD TRANSACTION:
    // - remains in MongoDB
    // - status becomes EDITED
    //
    // NEW TRANSACTION:
    // - gets new MongoDB ID
    // - gets current timestamp
    // - keeps original employee
    // - stores manager username in updatedBy
    // =========================================================
    public Transaction updateTransaction(
            String transactionId,
            UpdateTransactionRequest request,
            String updatedBy) {
        // -----------------------------------------------------
        // 1. Validate transaction ID
        // -----------------------------------------------------
        if (transactionId == null ||
                transactionId.trim().isEmpty()) {
            throw new IllegalArgumentException(
                    "Transaction ID is required"
            );
        }
        // -----------------------------------------------------
        // 2. Validate manager
        // -----------------------------------------------------
        if (updatedBy == null ||
                updatedBy.trim().isEmpty()) {
            throw new IllegalArgumentException(
                    "Manager information is required"
            );
        }
        // -----------------------------------------------------
        // 3. Validate request
        // -----------------------------------------------------
        if (request == null) {
            throw new IllegalArgumentException(
                    "Transaction update request is required"
            );
        }
        if (request.getType() == null ||
                request.getType()
                        .trim()
                        .isEmpty()) {
            throw new IllegalArgumentException(
                    "Transaction type is required"
            );
        }
        if (request.getAmount() <= 0) {
            throw new IllegalArgumentException(
                    "Transaction amount must be greater than zero"
            );
        }
        String newType =
                request.getType()
                        .trim()
                        .toUpperCase();
        if (!newType.equals("DEPOSIT") &&
                !newType.equals("WITHDRAW") &&
                !newType.equals("TRANSFER")) {
            throw new IllegalArgumentException(
                    "Invalid transaction type"
            );
        }
        // -----------------------------------------------------
        // 4. Find old transaction
        // -----------------------------------------------------
        Transaction oldTransaction =
                transactionRepository
                        .findById(transactionId)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "Transaction not found"
                                )
                        );
        // -----------------------------------------------------
        // 5. Do not edit an already edited historical record
        // -----------------------------------------------------
        if ("EDITED".equalsIgnoreCase(
                oldTransaction.getStatus()
        )) {
            throw new IllegalArgumentException(
                    "This transaction has already been edited"
            );
        }
        // -----------------------------------------------------
        // 6. Validate new transaction information
        // -----------------------------------------------------
        validateNewTransaction(
                request,
                newType
        );
        // -----------------------------------------------------
        // 7. Reverse old transaction effect
        // -----------------------------------------------------
        reverseTransactionEffect(
                oldTransaction
        );
        // -----------------------------------------------------
        // 8. Create NEW transaction
        // -----------------------------------------------------
        Transaction newTransaction =
                new Transaction();
        /*
         * IMPORTANT:
         *
         * We DO NOT copy the old ID.
         *
         * MongoDB will generate a new ID because
         * newTransaction.id is null.
         */
        // -----------------------------------------------------
        // 9. Keep original employee
        // -----------------------------------------------------
        newTransaction.setEmployeeId(
                oldTransaction.getEmployeeId()
        );
        // -----------------------------------------------------
        // 10. Apply new transaction effect
        // -----------------------------------------------------
        applyNewTransactionEffect(
                newTransaction,
                request,
                newType
        );
        // -----------------------------------------------------
        // 11. Set new editable information
        // -----------------------------------------------------
        newTransaction.setType(
                newType
        );
        newTransaction.setAmount(
                request.getAmount()
        );
        newTransaction.setDescription(
                request.getDescription()
        );
        // -----------------------------------------------------
        // 12. New current timestamp
        // -----------------------------------------------------
        newTransaction.setTimestamp(
                LocalDateTime.now()
        );
        // -----------------------------------------------------
        // 13. New transaction is active
        // -----------------------------------------------------
        newTransaction.setStatus(
                "ACTIVE"
        );
        // -----------------------------------------------------
        // 14. Manager who edited it
        // -----------------------------------------------------
        newTransaction.setUpdatedBy(
                updatedBy.trim()
        );
        // -----------------------------------------------------
        // 15. Save new transaction
        //
        // MongoDB generates a NEW ID.
        // -----------------------------------------------------
        Transaction savedNewTransaction =
                transactionRepository.save(
                        newTransaction
                );
        // -----------------------------------------------------
        // 16. Mark old transaction as edited
        // -----------------------------------------------------
        oldTransaction.setStatus(
                "EDITED"
        );
        oldTransaction.setUpdatedBy(
                updatedBy.trim()
        );
        oldTransaction.setSupersededBy(
                savedNewTransaction.getId()
        );
        transactionRepository.save(
                oldTransaction
        );
        // -----------------------------------------------------
        // 17. Return new transaction to frontend
        // -----------------------------------------------------
        return savedNewTransaction;
    }
    // =========================================================
    // VALIDATE NEW TRANSACTION
    // =========================================================
    private void validateNewTransaction(
            UpdateTransactionRequest request,
            String newType) {
        // -----------------------------------------------------
        // DEPOSIT
        // -----------------------------------------------------
        if (newType.equals("DEPOSIT")) {
            if (request.getCustomerAccountNumber() == null ||
                    request.getCustomerAccountNumber()
                            .trim()
                            .isEmpty()) {
                throw new IllegalArgumentException(
                        "Customer account number is required"
                );
            }
            findCustomerByAccountNumber(
                    request.getCustomerAccountNumber()
            );
        }
        // -----------------------------------------------------
        // WITHDRAW
        // -----------------------------------------------------
        if (newType.equals("WITHDRAW")) {
            if (request.getCustomerAccountNumber() == null ||
                    request.getCustomerAccountNumber()
                            .trim()
                            .isEmpty()) {
                throw new IllegalArgumentException(
                        "Customer account number is required"
                );
            }
            findCustomerByAccountNumber(
                    request.getCustomerAccountNumber()
            );
        }
        // -----------------------------------------------------
        // TRANSFER
        // -----------------------------------------------------
        if (newType.equals("TRANSFER")) {
            if (request.getSenderAccountNumber() == null ||
                    request.getSenderAccountNumber()
                            .trim()
                            .isEmpty()) {
                throw new IllegalArgumentException(
                        "Sender account number is required"
                );
            }
            if (request.getReceiverAccountNumber() == null ||
                    request.getReceiverAccountNumber()
                            .trim()
                            .isEmpty()) {
                throw new IllegalArgumentException(
                        "Receiver account number is required"
                );
            }
            Customer sender =
                    findCustomerByAccountNumber(
                            request.getSenderAccountNumber()
                    );
            Customer receiver =
                    findCustomerByAccountNumber(
                            request.getReceiverAccountNumber()
                    );
            if (sender.getId()
                    .equals(receiver.getId())) {
                throw new IllegalArgumentException(
                        "Sender and receiver cannot be the same"
                );
            }
        }
    }
    // =========================================================
    // REVERSE OLD TRANSACTION EFFECT
    // =========================================================
    private void reverseTransactionEffect(
            Transaction transaction) {
        String type =
                transaction.getType();
        if (type == null ||
                type.trim().isEmpty()) {
            throw new IllegalArgumentException(
                    "Existing transaction type is missing"
            );
        }
        type =
                type.trim()
                        .toUpperCase();
        // -----------------------------------------------------
        // OLD DEPOSIT
        // -----------------------------------------------------
        if (type.equals("DEPOSIT")) {
            Customer customer =
                    findCustomerById(
                            transaction.getCustomerId()
                    );
            customer.setBalance(
                    customer.getBalance()
                            - transaction.getAmount()
            );
            if (customer.getBalance() < 0) {
                throw new IllegalArgumentException(
                        "Invalid transaction data: balance cannot become negative"
                );
            }
            customerRepository.save(
                    customer
            );
        }
        // -----------------------------------------------------
        // OLD WITHDRAW
        // -----------------------------------------------------
        else if (type.equals("WITHDRAW")) {
            Customer customer =
                    findCustomerById(
                            transaction.getCustomerId()
                    );
            customer.setBalance(
                    customer.getBalance()
                            + transaction.getAmount()
            );
            customerRepository.save(
                    customer
            );
        }
        // -----------------------------------------------------
        // OLD TRANSFER
        // -----------------------------------------------------
        else if (type.equals("TRANSFER")) {
            Customer sender =
                    findCustomerById(
                            transaction.getSenderCustomerId()
                    );
            Customer receiver =
                    findCustomerById(
                            transaction.getReceiverCustomerId()
                    );
            /*
             * Return money to sender.
             */
            sender.setBalance(
                    sender.getBalance()
                            + transaction.getAmount()
            );
            /*
             * Remove the old transferred amount
             * from receiver.
             */
            receiver.setBalance(
                    receiver.getBalance()
                            - transaction.getAmount()
            );
            if (receiver.getBalance() < 0) {
                throw new IllegalArgumentException(
                        "Invalid transaction data: receiver balance cannot become negative"
                );
            }
            customerRepository.save(
                    sender
            );
            customerRepository.save(
                    receiver
            );
        }
        else {
            throw new IllegalArgumentException(
                    "Invalid existing transaction type"
            );
        }
    }
    // =========================================================
    // APPLY NEW TRANSACTION EFFECT
    // =========================================================
    private void applyNewTransactionEffect(
            Transaction transaction,
            UpdateTransactionRequest request,
            String newType) {
        // -----------------------------------------------------
        // NEW DEPOSIT
        // -----------------------------------------------------
        if (newType.equals("DEPOSIT")) {
            Customer customer =
                    findCustomerByAccountNumber(
                            request.getCustomerAccountNumber()
                    );
            customer.setBalance(
                    customer.getBalance()
                            + request.getAmount()
            );
            customerRepository.save(
                    customer
            );
            transaction.setCustomerId(
                    customer.getId()
            );
            transaction.setSenderCustomerId(
                    null
            );
            transaction.setReceiverCustomerId(
                    null
            );
        }
        // -----------------------------------------------------
        // NEW WITHDRAW
        // -----------------------------------------------------
        else if (newType.equals("WITHDRAW")) {
            Customer customer =
                    findCustomerByAccountNumber(
                            request.getCustomerAccountNumber()
                    );
            if (customer.getBalance()
                    < request.getAmount()) {
                throw new IllegalArgumentException(
                        "Insufficient balance"
                );
            }
            customer.setBalance(
                    customer.getBalance()
                            - request.getAmount()
            );
            customerRepository.save(
                    customer
            );
            transaction.setCustomerId(
                    customer.getId()
            );
            transaction.setSenderCustomerId(
                    null
            );
            transaction.setReceiverCustomerId(
                    null
            );
        }
        // -----------------------------------------------------
        // NEW TRANSFER
        // -----------------------------------------------------
        else if (newType.equals("TRANSFER")) {
            Customer sender =
                    findCustomerByAccountNumber(
                            request.getSenderAccountNumber()
                    );
            Customer receiver =
                    findCustomerByAccountNumber(
                            request.getReceiverAccountNumber()
                    );
            if (sender.getId()
                    .equals(receiver.getId())) {
                throw new IllegalArgumentException(
                        "Sender and receiver cannot be the same"
                );
            }
            if (sender.getBalance()
                    < request.getAmount()) {
                throw new IllegalArgumentException(
                        "Insufficient balance"
                );
            }
            sender.setBalance(
                    sender.getBalance()
                            - request.getAmount()
            );
            receiver.setBalance(
                    receiver.getBalance()
                            + request.getAmount()
            );
            customerRepository.save(
                    sender
            );
            customerRepository.save(
                    receiver
            );
            transaction.setCustomerId(
                    null
            );
            transaction.setSenderCustomerId(
                    sender.getId()
            );
            transaction.setReceiverCustomerId(
                    receiver.getId()
            );
        }
    }
    // =========================================================
    // FIND CUSTOMER BY ID
    // =========================================================
    private Customer findCustomerById(
            String customerId) {
        if (customerId == null ||
                customerId.trim().isEmpty()) {
            throw new IllegalArgumentException(
                    "Customer ID is missing"
            );
        }
        return customerRepository
                .findById(customerId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Customer not found"
                        )
                );
    }
    // =========================================================
    // FIND CUSTOMER BY ACCOUNT NUMBER
    // =========================================================
    private Customer findCustomerByAccountNumber(
            String accountNumber) {
        if (accountNumber == null ||
                accountNumber.trim().isEmpty()) {
            throw new IllegalArgumentException(
                    "Account number is required"
            );
        }
        return customerRepository
                .findByAccountNumber(
                        accountNumber.trim()
                )
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Customer account not found: "
                                        + accountNumber
                        )
                );
    }
    // =========================================================
    // EMPLOYEE VALIDATION
    // =========================================================
    private void validateEmployee(
            String employeeId) {
        if (employeeId == null ||
                employeeId.trim().isEmpty()) {
            throw new IllegalArgumentException(
                    "Employee ID is required"
            );
        }
        employeeRepository
                .findById(employeeId)
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Employee not found"
                        )
                );
    }
}