package com.bank.management.dto;
import java.time.LocalDateTime;
public class AnalyticsRequest {
    private LocalDateTime fromDate;
    private LocalDateTime toDate;
    private String type;
    public AnalyticsRequest() {
    }
    public LocalDateTime getFromDate() {
        return fromDate;
    }
    public void setFromDate(LocalDateTime fromDate) {
        this.fromDate = fromDate;
    }
    public LocalDateTime getToDate() {
        return toDate;
    }
    public void setToDate(LocalDateTime toDate) {
        this.toDate = toDate;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
}