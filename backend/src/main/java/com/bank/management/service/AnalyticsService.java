package com.bank.management.service;
import com.bank.management.dto.AnalyticsRequest;
import com.bank.management.dto.AnalyticsResponse;
import com.bank.management.repository.AnalyticsRepository;
import org.springframework.stereotype.Service;
@Service
public class AnalyticsService {
    private final AnalyticsRepository analyticsRepository;
    public AnalyticsService(
            AnalyticsRepository analyticsRepository) {
        this.analyticsRepository = analyticsRepository;
    }
    public AnalyticsResponse getAnalytics(
            AnalyticsRequest request) {
        AnalyticsResponse response =
                analyticsRepository.getSummary(request);
        response.setTypeAnalysis(
                analyticsRepository.getTypeAnalysis(request)
        );
        response.setCustomerAnalysis(
                analyticsRepository.getCustomerAnalysis(request)
        );
        response.setDateAnalysis(
                analyticsRepository.getDateAnalysis(request)
        );
        response.setTopCustomers(
                analyticsRepository.getTopCustomers(request)
        );
        return response;
    }
}