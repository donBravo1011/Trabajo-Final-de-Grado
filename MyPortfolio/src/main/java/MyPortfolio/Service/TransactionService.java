package MyPortfolio.Service;

import MyPortfolio.Entity.Transaction;

import java.util.List;

public interface TransactionService {
    public Transaction register(Transaction transaction);
    public List<Transaction> getTransactions(Long asset_id);
}
