package com.bank.management.controller;
import com.bank.management.dto.DepositRequest;
import com.bank.management.dto.TransferRequest;
import com.bank.management.dto.WithdrawRequest;
import com.bank.management.model.Transaction;
import com.bank.management.service.TransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/transactions")
public class TransactionController {
    private final TransactionService transactionService;
    public TransactionController(
            TransactionService transactionService) {
        this.transactionService = transactionService;
    }
    @PostMapping("/deposit")
    public ResponseEntity<Transaction> deposit(
            @RequestBody DepositRequest request) {
        return ResponseEntity.ok(
                transactionService.deposit(request)
        );
    }
    @PostMapping("/withdraw")
    public ResponseEntity<Transaction> withdraw(
            @RequestBody WithdrawRequest request) {
        return ResponseEntity.ok(
                transactionService.withdraw(request)
        );
    }
    @PostMapping("/transfer")
    public ResponseEntity<Transaction> transfer(
            @RequestBody TransferRequest request) {
        return ResponseEntity.ok(
                transactionService.transfer(request)
        );
    }
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<Transaction>>
    getCustomerTransactions(
            @PathVariable String customerId) {
        return ResponseEntity.ok(
                transactionService
                        .getCustomerTransactions(customerId)
        );
    }
}