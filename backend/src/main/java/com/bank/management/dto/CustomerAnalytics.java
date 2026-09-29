package com.bank.management.dto;
public class CustomerAnalytics {
    private String customerId;
    private String accountNumber;
    private String customerName;
    private long transactionCount;
    private double totalAmount;
    private long depositCount;
    private double depositAmount;
    private long withdrawalCount;
    private double withdrawalAmount;
    private long transferCount;
    private double transferAmount;
    public CustomerAnalytics() {
    }
    public CustomerAnalytics(
            String customerId,
            String accountNumber,
            String customerName,
            long transactionCount,
            double totalAmount,
            long depositCount,
            double depositAmount,
            long withdrawalCount,
            double withdrawalAmount,
            long transferCount,
            double transferAmount) {
        this.customerId = customerId;
        this.accountNumber = accountNumber;
        this.customerName = customerName;
        this.transactionCount = transactionCount;
        this.totalAmount = totalAmount;
        this.depositCount = depositCount;
        this.depositAmount = depositAmount;
        this.withdrawalCount = withdrawalCount;
        this.withdrawalAmount = withdrawalAmount;
        this.transferCount = transferCount;
        this.transferAmount = transferAmount;
    }
    public String getCustomerId() {
        return customerId;
    }
    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }
    public String getAccountNumber() {
        return accountNumber;
    }
    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }
    public String getCustomerName() {
        return customerName;
    }
    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }
    public long getTransactionCount() {
        return transactionCount;
    }
    public void setTransactionCount(long transactionCount) {
        this.transactionCount = transactionCount;
    }
    public double getTotalAmount() {
        return totalAmount;
    }
    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }
    public long getDepositCount() {
        return depositCount;
    }
    public void setDepositCount(long depositCount) {
        this.depositCount = depositCount;
    }
    public double getDepositAmount() {
        return depositAmount;
    }
    public void setDepositAmount(double depositAmount) {
        this.depositAmount = depositAmount;
    }
    public long getWithdrawalCount() {
        return withdrawalCount;
    }
    public void setWithdrawalCount(long withdrawalCount) {
        this.withdrawalCount = withdrawalCount;
    }
    public double getWithdrawalAmount() {
        return withdrawalAmount;
    }
    public void setWithdrawalAmount(double withdrawalAmount) {
        this.withdrawalAmount = withdrawalAmount;
    }
    public long getTransferCount() {
        return transferCount;
    }
    public void setTransferCount(long transferCount) {
        this.transferCount = transferCount;
    }
    public double getTransferAmount() {
        return transferAmount;
    }
    public void setTransferAmount(double transferAmount) {
        this.transferAmount = transferAmount;
    }
}