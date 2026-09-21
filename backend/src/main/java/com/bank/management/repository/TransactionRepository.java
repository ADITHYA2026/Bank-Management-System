package com.bank.management.repository;
import com.bank.management.model.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
public interface TransactionRepository extends MongoRepository<Transaction, String> {
    List<Transaction> findByCustomerIdOrderByTimestampDesc(String customerId);
    List<Transaction> findBySenderCustomerIdOrReceiverCustomerIdOrderByTimestampDesc(
            String senderCustomerId,
            String receiverCustomerId
    );
    List<Transaction> findAllByOrderByTimestampDesc();
}