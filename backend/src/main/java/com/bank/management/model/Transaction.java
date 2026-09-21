package com.bank.management.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;
@Document(collection = "transactions")
public class Transaction {
    @Id
    private String id;
    private String customerId;
    private String employeeId;
    private String type;
    private double amount;
    private String senderCustomerId;
    private String receiverCustomerId;
    private String description;
    private LocalDateTime timestamp;
    public Transaction() {
    }
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getCustomerId() {
        return customerId;
    }
    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }
    public String getEmployeeId() {
        return employeeId;
    }
    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public double getAmount() {
        return amount;
    }
    public void setAmount(double amount) {
        this.amount = amount;
    }
    public String getSenderCustomerId() {
        return senderCustomerId;
    }
    public void setSenderCustomerId(String senderCustomerId) {
        this.senderCustomerId = senderCustomerId;
    }
    public String getReceiverCustomerId() {
        return receiverCustomerId;
    }
    public void setReceiverCustomerId(String receiverCustomerId) {
        this.receiverCustomerId = receiverCustomerId;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public LocalDateTime getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}