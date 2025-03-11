package MyPortfolio.Service;

import MyPortfolio.Entity.Transaction;
import MyPortfolio.Repository.TransactionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService{

    private final TransactionRepository transactionRepository;

    public TransactionServiceImpl(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }


    @Override
    public Transaction register(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    @Override
    public Transaction getTransactionById(Long id) {
        return transactionRepository.findById(id).get();
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
        return null;
    }

    @Override
    public Transaction addTransactionToPortfolio(Long portfolioId, Transaction transaction) {
        return null;
    }


//    public AssetInfo getRealTimeAssetInfo(String assetId) {
//        String apiUrl = "https://api.marketdata.com/assets/" + assetId;
//        RestTemplate restTemplate = new RestTemplate();
//        return restTemplate.getForObject(apiUrl, AssetInfo.class);
//    }
}
