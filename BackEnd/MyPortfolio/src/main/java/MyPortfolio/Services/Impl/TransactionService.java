package MyPortfolio.Services.Impl;

import MyPortfolio.Entities.Transaction;

import java.util.List;

public interface TransactionService {
    public Transaction register(Transaction transaction);
    Transaction getTransactionById(Long id);
    Transaction updateTransaction(Transaction transaction);
    void deleteTransaction(Long id);
    List<Transaction> getTransactionsByPortfolio(Long portfolioId);
}
