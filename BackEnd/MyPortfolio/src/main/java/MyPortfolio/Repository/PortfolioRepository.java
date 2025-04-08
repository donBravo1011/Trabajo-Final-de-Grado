package MyPortfolio.Repository;

import MyPortfolio.Entity.Portfolio;
import MyPortfolio.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PortfolioRepository extends JpaRepository<Portfolio,Long> {
    List<Portfolio> findByUserId(Long id);
}
