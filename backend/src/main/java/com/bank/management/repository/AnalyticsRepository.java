package com.bank.management.repository;
import com.bank.management.dto.AnalyticsRequest;
import com.bank.management.dto.AnalyticsResponse;
import com.bank.management.dto.CustomerAnalytics;
import com.bank.management.dto.DateAnalytics;
import com.bank.management.dto.TypeAnalytics;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.ConditionalOperators;
import org.springframework.data.mongodb.core.aggregation.MatchOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Repository;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
@Repository
public class AnalyticsRepository {
    private final MongoTemplate mongoTemplate;
    public AnalyticsRepository(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }
    private MatchOperation buildMatchOperation(AnalyticsRequest request) {
        Criteria criteria = new Criteria();
        Criteria activeTransactionCriteria = new Criteria().orOperator(
                Criteria.where("status").is("ACTIVE"),
                Criteria.where("status").exists(false),
                Criteria.where("status").is(null)
        );
        criteria.andOperator(activeTransactionCriteria);
        if (request.getFromDate() != null || request.getToDate() != null) {
            Criteria timestampCriteria = criteria.and("timestamp");
            if (request.getFromDate() != null) {
                timestampCriteria.gte(request.getFromDate());
            }
            if (request.getToDate() != null) {
                timestampCriteria.lte(request.getToDate());
            }
        }
        if (request.getType() != null
                && !request.getType().trim().isEmpty()
                && !"ALL".equalsIgnoreCase(request.getType())) {
            criteria.and("type").is(request.getType().trim().toUpperCase());
        }
        return Aggregation.match(criteria);
    }
    public AnalyticsResponse getSummary(AnalyticsRequest request) {
        MatchOperation matchOperation = buildMatchOperation(request);
        Aggregation aggregation = Aggregation.newAggregation(
                matchOperation,
                Aggregation.group()
                        .count()
                        .as("totalTransactions")
                        .sum("amount")
                        .as("totalAmount")
                        .sum(
                                ConditionalOperators.when(
                                                Criteria.where("type").is("DEPOSIT")
                                        )
                                        .then(1)
                                        .otherwise(0)
                        )
                        .as("totalDeposits")
                        .sum(
                                ConditionalOperators.when(
                                                Criteria.where("type").is("WITHDRAW")
                                        )
                                        .then(1)
                                        .otherwise(0)
                        )
                        .as("totalWithdrawals")
                        .sum(
                                ConditionalOperators.when(
                                                Criteria.where("type").is("TRANSFER")
                                        )
                                        .then(1)
                                        .otherwise(0)
                        )
                        .as("totalTransfers")
                        .sum(
                                ConditionalOperators.when(
                                                Criteria.where("type").is("DEPOSIT")
                                        )
                                        .thenValueOf("$amount")
                                        .otherwise(0)
                        )
                        .as("totalDepositAmount")
                        .sum(
                                ConditionalOperators.when(
                                                Criteria.where("type").is("WITHDRAW")
                                        )
                                        .thenValueOf("$amount")
                                        .otherwise(0)
                        )
                        .as("totalWithdrawalAmount")
                        .sum(
                                ConditionalOperators.when(
                                                Criteria.where("type").is("TRANSFER")
                                        )
                                        .thenValueOf("$amount")
                                        .otherwise(0)
                        )
                        .as("totalTransferAmount")
        );
        List<Map> results = mongoTemplate
                .aggregate(aggregation, "transactions", Map.class)
                .getMappedResults();
        AnalyticsResponse response = new AnalyticsResponse();
        if (results.isEmpty()) {
            return response;
        }
        Map result = results.get(0);
        response.setTotalTransactions(
                getLongValue(result.get("totalTransactions"))
        );
        response.setTotalAmount(
                getDoubleValue(result.get("totalAmount"))
        );
        response.setTotalDeposits(
                getLongValue(result.get("totalDeposits"))
        );
        response.setTotalDepositAmount(
                getDoubleValue(result.get("totalDepositAmount"))
        );
        response.setTotalWithdrawals(
                getLongValue(result.get("totalWithdrawals"))
        );
        response.setTotalWithdrawalAmount(
                getDoubleValue(result.get("totalWithdrawalAmount"))
        );
        response.setTotalTransfers(
                getLongValue(result.get("totalTransfers"))
        );
        response.setTotalTransferAmount(
                getDoubleValue(result.get("totalTransferAmount"))
        );
        return response;
    }
    // Step 6: Type Analysis
    public List<TypeAnalytics> getTypeAnalysis(AnalyticsRequest request) {
        MatchOperation matchOperation = buildMatchOperation(request);
        Aggregation aggregation = Aggregation.newAggregation(
                matchOperation,
                Aggregation.group("type")
                        .count()
                        .as("transactionCount")
                        .sum("amount")
                        .as("totalAmount")
        );
        List<Map> results = mongoTemplate
                .aggregate(aggregation, "transactions", Map.class)
                .getMappedResults();
        List<TypeAnalytics> typeAnalysis = new ArrayList<>();
        for (Map result : results) {
            TypeAnalytics typeAnalytics = new TypeAnalytics();
            typeAnalytics.setType(
                    String.valueOf(result.get("_id"))
            );
            typeAnalytics.setTransactionCount(
                    getLongValue(result.get("transactionCount"))
            );
            typeAnalytics.setTotalAmount(
                    getDoubleValue(result.get("totalAmount"))
            );
            typeAnalysis.add(typeAnalytics);
        }
        return typeAnalysis;
    }
    // Step 7: Customer Analysis
    public List<CustomerAnalytics> getCustomerAnalysis(
            AnalyticsRequest request) {
        MatchOperation matchOperation = buildMatchOperation(request);
        Aggregation aggregation = Aggregation.newAggregation(
                matchOperation,
                Aggregation.project()
                        .and(
                                ConditionalOperators.when(
                                                Criteria.where("type").is("TRANSFER")
                                        )
                                        .thenValueOf("$senderCustomerId")
                                        .otherwise("$customerId")
                        )
                        .as("customerId")
                        .and("type")
                        .as("type")
                        .and("amount")
                        .as("amount")
        );
        List<Map> results = mongoTemplate
                .aggregate(aggregation, "transactions", Map.class)
                .getMappedResults();
        List<CustomerAnalytics> customerAnalysis = new ArrayList<>();
        for (Map result : results) {
            String customerId = result.get("customerId") != null
                    ? String.valueOf(result.get("customerId"))
                    : null;
            if (customerId == null || customerId.trim().isEmpty()) {
                continue;
            }
            String type = result.get("type") != null
                    ? String.valueOf(result.get("type"))
                    : "";
            double amount = getDoubleValue(result.get("amount"));
            CustomerAnalytics existingCustomer =
                    findCustomerAnalytics(customerAnalysis, customerId);
            if (existingCustomer == null) {
                existingCustomer = new CustomerAnalytics();
                existingCustomer.setCustomerId(customerId);
                existingCustomer.setTransactionCount(0);
                existingCustomer.setTotalAmount(0);
                customerAnalysis.add(existingCustomer);
            }
            existingCustomer.setTransactionCount(
                    existingCustomer.getTransactionCount() + 1
            );
            existingCustomer.setTotalAmount(
                    existingCustomer.getTotalAmount() + amount
            );
            if ("DEPOSIT".equals(type)) {
                existingCustomer.setDepositCount(
                        existingCustomer.getDepositCount() + 1
                );
                existingCustomer.setDepositAmount(
                        existingCustomer.getDepositAmount() + amount
                );
            } else if ("WITHDRAW".equals(type)) {
                existingCustomer.setWithdrawalCount(
                        existingCustomer.getWithdrawalCount() + 1
                );
                existingCustomer.setWithdrawalAmount(
                        existingCustomer.getWithdrawalAmount() + amount
                );
            } else if ("TRANSFER".equals(type)) {
                existingCustomer.setTransferCount(
                        existingCustomer.getTransferCount() + 1
                );
                existingCustomer.setTransferAmount(
                        existingCustomer.getTransferAmount() + amount
                );
            }
        }
        return customerAnalysis;
    }
    private CustomerAnalytics findCustomerAnalytics(
            List<CustomerAnalytics> customerAnalysis,
            String customerId) {
        for (CustomerAnalytics customer : customerAnalysis) {
            if (customerId.equals(customer.getCustomerId())) {
                return customer;
            }
        }
        return null;
    }
    // Step 8: Date Analysis
    public List<DateAnalytics> getDateAnalysis(
            AnalyticsRequest request) {
        MatchOperation matchOperation = buildMatchOperation(request);
        Aggregation aggregation = Aggregation.newAggregation(
                matchOperation,
                Aggregation.project()
                        .andExpression(
                                "dateToString('%Y-%m-%d', timestamp)"
                        )
                        .as("date")
                        .and("amount")
                        .as("amount"),
                Aggregation.group("date")
                        .count()
                        .as("transactionCount")
                        .sum("amount")
                        .as("totalAmount"),
                Aggregation.sort(
                        org.springframework.data.domain.Sort.Direction.ASC,
                        "_id"
                )
        );
        List<Map> results = mongoTemplate
                .aggregate(aggregation, "transactions", Map.class)
                .getMappedResults();
        List<DateAnalytics> dateAnalysis = new ArrayList<>();
        for (Map result : results) {
            DateAnalytics dateAnalytics = new DateAnalytics();
            dateAnalytics.setDate(
                    String.valueOf(result.get("_id"))
            );
            dateAnalytics.setTransactionCount(
                    getLongValue(result.get("transactionCount"))
            );
            dateAnalytics.setTotalAmount(
                    getDoubleValue(result.get("totalAmount"))
            );
            dateAnalysis.add(dateAnalytics);
        }
        return dateAnalysis;
    }
    // Step 9: Top Customer Analysis
    public List<CustomerAnalytics> getTopCustomers(
            AnalyticsRequest request) {
        MatchOperation matchOperation = buildMatchOperation(request);
        Aggregation aggregation = Aggregation.newAggregation(
                matchOperation,
                Aggregation.project()
                        .and(
                                ConditionalOperators.when(
                                                Criteria.where("type").is("TRANSFER")
                                        )
                                        .thenValueOf("$senderCustomerId")
                                        .otherwise("$customerId")
                        )
                        .as("customerId")
                        .and("amount")
                        .as("amount"),
                Aggregation.match(
                        Criteria.where("customerId").ne(null)
                ),
                Aggregation.group("customerId")
                        .count()
                        .as("transactionCount")
                        .sum("amount")
                        .as("totalAmount"),
                Aggregation.sort(
                        org.springframework.data.domain.Sort.Direction.DESC,
                        "transactionCount",
                        "totalAmount"
                ),
                Aggregation.limit(5)
        );
        List<Map> results = mongoTemplate
                .aggregate(aggregation, "transactions", Map.class)
                .getMappedResults();
        List<CustomerAnalytics> topCustomers = new ArrayList<>();
        for (Map result : results) {
            CustomerAnalytics customerAnalytics =
                    new CustomerAnalytics();
            customerAnalytics.setCustomerId(
                    String.valueOf(result.get("_id"))
            );
            customerAnalytics.setTransactionCount(
                    getLongValue(result.get("transactionCount"))
            );
            customerAnalytics.setTotalAmount(
                    getDoubleValue(result.get("totalAmount"))
            );
            topCustomers.add(customerAnalytics);
        }
        return topCustomers;
    }
    private long getLongValue(Object value) {
        if (value == null) {
            return 0;
        }
        if (value instanceof Number) {
            return ((Number) value).longValue();
        }
        return 0;
    }
    private double getDoubleValue(Object value) {
        if (value == null) {
            return 0;
        }
        if (value instanceof Number) {
            return ((Number) value).doubleValue();
        }
        return 0;
    }
}