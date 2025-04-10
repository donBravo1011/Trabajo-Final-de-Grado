package MyPortfolio.Service;

import MyPortfolio.Entity.Portfolio;
import MyPortfolio.Entity.User;

import java.util.List;

public interface PortfolioService {
    public Portfolio register(Portfolio portfolio);
    public List<Portfolio> getPortfoliosByUser(Long id);
    public Portfolio getById(Long id);
    public Portfolio update(Portfolio portfolio);
    public void delete(Long id);

    public List<Portfolio> findByUserEmail(String email);

}
