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
    public List<Transaction> getTransactions(Long asset_id) {

        return transactionRepository.findAll();
    }

//    public AssetInfo getRealTimeAssetInfo(String assetId) {
//        String apiUrl = "https://api.marketdata.com/assets/" + assetId;
//        RestTemplate restTemplate = new RestTemplate();
//        return restTemplate.getForObject(apiUrl, AssetInfo.class);
//    }
}
