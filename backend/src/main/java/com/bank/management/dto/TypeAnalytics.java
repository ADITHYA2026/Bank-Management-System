package com.bank.management.dto;
public class TypeAnalytics {
    private String type;
    private long transactionCount;
    private double totalAmount;
    public TypeAnalytics() {
    }
    public TypeAnalytics(
            String type,
            long transactionCount,
            double totalAmount) {
        this.type = type;
        this.transactionCount = transactionCount;
        this.totalAmount = totalAmount;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
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
}