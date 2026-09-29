package com.bank.management.dto;
public class UpdateTransactionRequest {
    private String customerAccountNumber;
    private String senderAccountNumber;
    private String receiverAccountNumber;
    private String type;
    private double amount;
    private String description;
    // =========================================================
    // CONSTRUCTOR
    // =========================================================
    public UpdateTransactionRequest() {
    }
    // =========================================================
    // GETTERS AND SETTERS
    // =========================================================
    public String getCustomerAccountNumber() {
        return customerAccountNumber;
    }
    public void setCustomerAccountNumber(
            String customerAccountNumber) {
        this.customerAccountNumber =
                customerAccountNumber;
    }
    public String getSenderAccountNumber() {
        return senderAccountNumber;
    }
    public void setSenderAccountNumber(
            String senderAccountNumber) {
        this.senderAccountNumber =
                senderAccountNumber;
    }
    public String getReceiverAccountNumber() {
        return receiverAccountNumber;
    }
    public void setReceiverAccountNumber(
            String receiverAccountNumber) {
        this.receiverAccountNumber =
                receiverAccountNumber;
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
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
}