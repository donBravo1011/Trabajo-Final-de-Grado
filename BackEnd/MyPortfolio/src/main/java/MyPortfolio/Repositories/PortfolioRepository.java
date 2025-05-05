package MyPortfolio.Repositories;

import MyPortfolio.Entities.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PortfolioRepository extends JpaRepository<Portfolio,Long> {
    List<Portfolio> findByUserId(Long id);
    List<Portfolio> findByUserEmail(String email);
}
