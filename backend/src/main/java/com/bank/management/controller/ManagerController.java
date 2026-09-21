package com.bank.management.controller;
import com.bank.management.dto.ManagerDashboardResponse;
import com.bank.management.dto.UpdateCustomerRequest;
import com.bank.management.model.Customer;
import com.bank.management.model.Transaction;
import com.bank.management.service.CustomerService;
import com.bank.management.service.ManagerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/manager")
public class ManagerController {
    private final ManagerService managerService;
    private final CustomerService customerService;
    public ManagerController(
            ManagerService managerService,
            CustomerService customerService) {
        this.managerService = managerService;
        this.customerService = customerService;
    }
    @GetMapping("/dashboard")
    public ResponseEntity<ManagerDashboardResponse>
    getDashboard() {
        return ResponseEntity.ok(
                managerService.getDashboard()
        );
    }
    @GetMapping("/customers")
    public ResponseEntity<List<Customer>>
    getAllCustomers() {
        return ResponseEntity.ok(
                managerService.getAllCustomers()
        );
    }
    @GetMapping("/transactions")
    public ResponseEntity<List<Transaction>>
    getAllTransactions() {
        return ResponseEntity.ok(
                managerService.getAllTransactions()
        );
    }
    @PutMapping("/customers/{id}")
    public ResponseEntity<Customer> updateCustomer(
            @PathVariable String id,
            @RequestBody UpdateCustomerRequest request) {
        return ResponseEntity.ok(
                customerService.updateCustomer(
                        id,
                        request
                )
        );
    }
}