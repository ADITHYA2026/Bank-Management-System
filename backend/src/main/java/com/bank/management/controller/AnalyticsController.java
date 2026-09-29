package com.bank.management.controller;
import com.bank.management.dto.AnalyticsRequest;
import com.bank.management.dto.AnalyticsResponse;
import com.bank.management.service.AnalyticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/manager/analytics")
public class AnalyticsController {
    private final AnalyticsService analyticsService;
    public AnalyticsController(
            AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }
    @PostMapping
    @PreAuthorize("hasRole('MANAGER')")
    public ResponseEntity<AnalyticsResponse> getAnalytics(
            @RequestBody AnalyticsRequest request) {
        AnalyticsResponse response =
                analyticsService.getAnalytics(request);
        return ResponseEntity.ok(response);
    }
}