package MyPortfolio.Service;

import MyPortfolio.Entity.Portfolio;
import MyPortfolio.Entity.Transaction;
import MyPortfolio.Entity.User;
import MyPortfolio.Repository.PortfolioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PortfolioServiceImpl implements PortfolioService{

    private final PortfolioRepository portfolioRepository;

    public PortfolioServiceImpl(PortfolioRepository portfolioRepository) {
        this.portfolioRepository = portfolioRepository;
    }

    @Override
    public Portfolio register(Portfolio portfolio) {
        return portfolioRepository.save(portfolio);
    }

    @Override
    public List<Portfolio> getPortfoliosByUser(Long id) {
        return portfolioRepository.findByUserId(id);
    }

    @Override
    public Portfolio getById(Long id) {

        return portfolioRepository.findById(id).get();
    }

    @Override
    public Portfolio update(Portfolio portfolio) {
        Portfolio portfolioDb = portfolioRepository.findById(portfolio.getId()).get();

        portfolioDb.setNombre(portfolio.getNombre());

        for(Transaction t: portfolio.getTransactions()){
            for(Transaction x: portfolioDb.getTransactions()){
                if(t != x){
                    portfolioDb.addTransactions(t);
                }
            }
        }
        return portfolioRepository.save(portfolioDb);
    }

    @Override
    public void delete(Long id) {
        portfolioRepository.deleteById(id);
    }

    @Override
    public List<Portfolio> findByUserEmail(String email){
        return portfolioRepository.findByUserEmail(email);
    }
}
