package MyPortfolio.Controllers;

import MyPortfolio.Entities.Transaction;
import MyPortfolio.Exceptions.ResourceNotFoundException;
import MyPortfolio.Services.Impl.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> getTransactionById(@PathVariable Long id) {
        try {
            Transaction transaction = transactionService.getTransactionById(id);
            return ResponseEntity.ok(transaction);  // Si se encuentra, retorna el objeto
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());  // Si no se encuentra, retorna 404 con mensaje
        }
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
    public ResponseEntity<?> getTransactionsByPortfolio(@PathVariable Long portfolioId) {
        try {
            List<Transaction> transactions = transactionService.getTransactionsByPortfolio(portfolioId);
            return ResponseEntity.ok(transactions);  // Si se encuentran las transacciones, se devuelve un 200 OK con la lista
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());  // Si no se encuentra el portfolio, se devuelve un 404 Not Found con el mensaje
        }
    }




}
