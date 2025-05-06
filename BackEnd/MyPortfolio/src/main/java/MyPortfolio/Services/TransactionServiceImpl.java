package MyPortfolio.Services;

import MyPortfolio.Entities.Portfolio;
import MyPortfolio.Entities.Transaction;
import MyPortfolio.Exceptions.ResourceNotFoundException;
import MyPortfolio.Repositories.PortfolioRepository;
import MyPortfolio.Repositories.TransactionRepository;
import MyPortfolio.Services.Impl.TransactionService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository transactionRepository;
    private final PortfolioRepository portfolioRepository;

    public TransactionServiceImpl(TransactionRepository transactionRepository, PortfolioRepository portfolioRepository) {
        this.transactionRepository = transactionRepository;
        this.portfolioRepository = portfolioRepository;
    }


    @Override
    public Transaction register(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    @Override
    public Transaction getTransactionById(Long id) {
        return transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transacción con ID " + id + " no encontrada"));
    }


    @Override
    public Transaction updateTransaction(Transaction transaction) {

        Transaction transactionDb = transactionRepository.findById(transaction.getId()).get();

        transactionDb.setCantidad(transaction.getCantidad());
        transactionDb.setFecha(transaction.getFecha());
        transactionDb.setPrecio(transaction.getPrecio());
        transactionDb.setTipo(transaction.getTipo());
        transactionDb.setAssetId(transaction.getAssetId());


        return transactionRepository.save(transactionDb);
    }

    @Override
    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }

    @Override
    public List<Transaction> getTransactionsByPortfolio(Long portfolioId) {
        Portfolio portfolio = portfolioRepository.findById(portfolioId)
                .orElseThrow(() -> new ResourceNotFoundException("Portfolio con ID " + portfolioId + " no encontrado"));

        return portfolio.getTransactions();
    }



//    public AssetInfo getRealTimeAssetInfo(String assetId) {
//        String apiUrl = "https://api.marketdata.com/assets/" + assetId;
//        RestTemplate restTemplate = new RestTemplate();
//        return restTemplate.getForObject(apiUrl, AssetInfo.class);
//    }
}
