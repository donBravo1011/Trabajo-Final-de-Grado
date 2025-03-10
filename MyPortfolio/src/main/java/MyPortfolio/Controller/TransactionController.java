package MyPortfolio.Controller;

import MyPortfolio.Entity.Transaction;
import MyPortfolio.Service.TransactionService;
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
    public List<Transaction> getTransaction(@PathVariable Long asset_id){
        return transactionService.getTransactions(asset_id);
    }

}
