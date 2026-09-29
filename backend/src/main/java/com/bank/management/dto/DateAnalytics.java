package com.bank.management.dto;
public class DateAnalytics {
    private String date;
    private long transactionCount;
    private double totalAmount;
    public DateAnalytics() {
    }
    public DateAnalytics(
            String date,
            long transactionCount,
            double totalAmount) {
        this.date = date;
        this.transactionCount = transactionCount;
        this.totalAmount = totalAmount;
    }
    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
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