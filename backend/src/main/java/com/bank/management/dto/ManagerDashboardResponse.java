package com.bank.management.dto;
public class ManagerDashboardResponse {
    private long totalCustomers;
    private long totalTransactions;
    private double totalBalance;
    public ManagerDashboardResponse() {
    }
    public ManagerDashboardResponse(
            long totalCustomers,
            long totalTransactions,
            double totalBalance) {
        this.totalCustomers = totalCustomers;
        this.totalTransactions = totalTransactions;
        this.totalBalance = totalBalance;
    }
    public long getTotalCustomers() {
        return totalCustomers;
    }
    public void setTotalCustomers(long totalCustomers) {
        this.totalCustomers = totalCustomers;
    }
    public long getTotalTransactions() {
        return totalTransactions;
    }
    public void setTotalTransactions(long totalTransactions) {
        this.totalTransactions = totalTransactions;
    }
    public double getTotalBalance() {
        return totalBalance;
    }
    public void setTotalBalance(double totalBalance) {
        this.totalBalance = totalBalance;
    }
}