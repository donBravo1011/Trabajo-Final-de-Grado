package MyPortfolio.Services.Impl;

import MyPortfolio.Entities.Portfolio;

import java.util.List;

public interface PortfolioService {
    public Portfolio register(Portfolio portfolio);
    public List<Portfolio> getPortfoliosByUser(Long id);
    public Portfolio getById(Long id);
    public Portfolio update(Portfolio portfolio);
    public Portfolio updateName(Long id,String name);
    public void delete(Long id);

    public List<Portfolio> findByUserEmail(String email);

}
