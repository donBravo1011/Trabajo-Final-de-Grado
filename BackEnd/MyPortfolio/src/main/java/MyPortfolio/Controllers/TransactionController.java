package MyPortfolio.Controllers;

import MyPortfolio.Entities.Transaction;
import MyPortfolio.Services.Impl.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/transaction")
public class TransactionController {

    @Autowired
    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping
    public Transaction register(@RequestBody Transaction transaction){
        return transactionService.register(transaction);
    }

    @GetMapping("/{id}")
    public Transaction getTransactionByid(@PathVariable Long id){
        return transactionService.getTransactionById(id);
    }

    @PutMapping
    public Transaction update(@RequestBody Transaction transaction){
        return transactionService.updateTransaction(transaction);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        transactionService.deleteTransaction(id);
    }

    @GetMapping("/portfolio/{portfolioId}")
    public List<Transaction> getTransactionsByPortfolio(@PathVariable Long portfolioId) {
        return transactionService.getTransactionsByPortfolio(portfolioId);
    }



}
