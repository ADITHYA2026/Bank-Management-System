package com.bank.management.dto;
import java.util.List;
public class AnalyticsResponse {
    private long totalTransactions;
    private double totalAmount;
    private long totalDeposits;
    private double totalDepositAmount;
    private long totalWithdrawals;
    private double totalWithdrawalAmount;
    private long totalTransfers;
    private double totalTransferAmount;
    private List<TypeAnalytics> typeAnalysis;
    private List<CustomerAnalytics> customerAnalysis;
    private List<DateAnalytics> dateAnalysis;
    private List<CustomerAnalytics> topCustomers;
    public AnalyticsResponse() {
    }
    public long getTotalTransactions() {
        return totalTransactions;
    }
    public void setTotalTransactions(long totalTransactions) {
        this.totalTransactions = totalTransactions;
    }
    public double getTotalAmount() {
        return totalAmount;
    }
    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }
    public long getTotalDeposits() {
        return totalDeposits;
    }
    public void setTotalDeposits(long totalDeposits) {
        this.totalDeposits = totalDeposits;
    }
    public double getTotalDepositAmount() {
        return totalDepositAmount;
    }
    public void setTotalDepositAmount(double totalDepositAmount) {
        this.totalDepositAmount = totalDepositAmount;
    }
    public long getTotalWithdrawals() {
        return totalWithdrawals;
    }
    public void setTotalWithdrawals(long totalWithdrawals) {
        this.totalWithdrawals = totalWithdrawals;
    }
    public double getTotalWithdrawalAmount() {
        return totalWithdrawalAmount;
    }
    public void setTotalWithdrawalAmount(double totalWithdrawalAmount) {
        this.totalWithdrawalAmount = totalWithdrawalAmount;
    }
    public long getTotalTransfers() {
        return totalTransfers;
    }
    public void setTotalTransfers(long totalTransfers) {
        this.totalTransfers = totalTransfers;
    }
    public double getTotalTransferAmount() {
        return totalTransferAmount;
    }
    public void setTotalTransferAmount(double totalTransferAmount) {
        this.totalTransferAmount = totalTransferAmount;
    }
    public List<TypeAnalytics> getTypeAnalysis() {
        return typeAnalysis;
    }
    public void setTypeAnalysis(List<TypeAnalytics> typeAnalysis) {
        this.typeAnalysis = typeAnalysis;
    }
    public List<CustomerAnalytics> getCustomerAnalysis() {
        return customerAnalysis;
    }
    public void setCustomerAnalysis(List<CustomerAnalytics> customerAnalysis) {
        this.customerAnalysis = customerAnalysis;
    }
    public List<DateAnalytics> getDateAnalysis() {
        return dateAnalysis;
    }
    public void setDateAnalysis(List<DateAnalytics> dateAnalysis) {
        this.dateAnalysis = dateAnalysis;
    }
    public List<CustomerAnalytics> getTopCustomers() {
        return topCustomers;
    }
    public void setTopCustomers(List<CustomerAnalytics> topCustomers) {
        this.topCustomers = topCustomers;
    }
}