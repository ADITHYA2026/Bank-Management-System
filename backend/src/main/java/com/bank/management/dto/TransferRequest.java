package com.bank.management.dto;
public class TransferRequest {
    private String senderCustomerId;
    private String employeeId;
    private String receiverAccountNumber;
    private double amount;
    private String description;
    public TransferRequest() {
    }
    public String getSenderCustomerId() {
        return senderCustomerId;
    }
    public void setSenderCustomerId(String senderCustomerId) {
        this.senderCustomerId = senderCustomerId;
    }
    public String getEmployeeId() {
        return employeeId;
    }
    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }
    public String getReceiverAccountNumber() {
        return receiverAccountNumber;
    }
    public void setReceiverAccountNumber(String receiverAccountNumber) {
        this.receiverAccountNumber = receiverAccountNumber;
    }
    public double getAmount() {
        return amount;
    }
    public void setAmount(double amount) {
        this.amount = amount;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
}