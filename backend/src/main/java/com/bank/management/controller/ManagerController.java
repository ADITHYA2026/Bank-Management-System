package com.bank.management.controller;
import com.bank.management.dto.ManagerDashboardResponse;
import com.bank.management.dto.UpdateCustomerRequest;
import com.bank.management.dto.UpdateTransactionRequest;
import com.bank.management.model.Customer;
import com.bank.management.model.Transaction;
import com.bank.management.service.CustomerService;
import com.bank.management.service.ManagerService;
import com.bank.management.service.TransactionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
@RestController
@RequestMapping("/api/manager")
public class ManagerController {
    private final ManagerService managerService;
    private final CustomerService customerService;
    private final TransactionService transactionService;
    public ManagerController(
            ManagerService managerService,
            CustomerService customerService,
            TransactionService transactionService) {
        this.managerService =
                managerService;
        this.customerService =
                customerService;
        this.transactionService =
                transactionService;
    }
    // =========================================================
    // DASHBOARD
    // =========================================================
    @GetMapping("/dashboard")
    public ResponseEntity<ManagerDashboardResponse>
    getDashboard() {
        return ResponseEntity.ok(
                managerService.getDashboard()
        );
    }
    // =========================================================
    // GET ALL CUSTOMERS
    // =========================================================
    @GetMapping("/customers")
    public ResponseEntity<List<Customer>>
    getAllCustomers() {
        return ResponseEntity.ok(
                managerService.getAllCustomers()
        );
    }
    // =========================================================
    // GET ALL TRANSACTIONS
    // =========================================================
    @GetMapping("/transactions")
    public ResponseEntity<Page<Transaction>> getAllTransactions(
            Pageable pageable) {
        return ResponseEntity.ok(
                managerService.getTransactions(pageable)
        );
    }
    // =========================================================
    // UPDATE CUSTOMER
    // =========================================================
    @PutMapping("/customers/{id}")
    public ResponseEntity<Customer>
    updateCustomer(
            @PathVariable String id,
            @RequestBody UpdateCustomerRequest request) {
        return ResponseEntity.ok(
                customerService.updateCustomer(
                        id,
                        request
                )
        );
    }
    // =========================================================
    // UPDATE TRANSACTION
    // =========================================================
    @PutMapping("/transactions/{id}")
    public ResponseEntity<Transaction>
    updateTransaction(
            @PathVariable String id,
            @RequestBody UpdateTransactionRequest request,
            Authentication authentication) {
        /*
         * Spring Security gets the username
         * from the authenticated JWT.
         *
         * For the manager account this will be:
         *
         * manager
         */
        String managerUsername =
                authentication.getName();
        return ResponseEntity.ok(
                transactionService.updateTransaction(
                        id,
                        request,
                        managerUsername
                )
        );
    }
}