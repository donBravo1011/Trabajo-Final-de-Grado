package MyPortfolio.Service;

import MyPortfolio.Entity.Portfolio;
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
        return null;
    }

    @Override
    public Portfolio update(Portfolio portfolio) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }
}
