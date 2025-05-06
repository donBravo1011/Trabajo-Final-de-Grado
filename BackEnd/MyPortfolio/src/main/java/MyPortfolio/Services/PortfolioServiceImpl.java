package MyPortfolio.Services;

import MyPortfolio.Entities.Portfolio;
import MyPortfolio.Entities.Transaction;
import MyPortfolio.Exceptions.ResourceNotFoundException;
import MyPortfolio.Repositories.PortfolioRepository;
import MyPortfolio.Services.Impl.PortfolioService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PortfolioServiceImpl implements PortfolioService {

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
        // Intentamos obtener los portfolios por el ID del usuario
        List<Portfolio> portfolios = portfolioRepository.findByUserId(id);
        // Si la lista está vacía, lanzamos una excepción ResourceNotFoundException
        if (portfolios.isEmpty()) {
            throw new ResourceNotFoundException("No se encontraron portafolios para el usuario con ID " + id);
        }
        return portfolios;
    }

    @Override
    public Portfolio getById(Long id) {
        try {
            // Intentamos obtener el Portfolio por ID
            return portfolioRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Portfolio con ID " + id + " no encontrado"));
        } catch (Exception ex) {
            // Si ocurre algún error, lanzamos la excepción ResourceNotFoundException
            throw new ResourceNotFoundException("No se encontró el Portfolio con ID " + id);
        }
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
    public List<Portfolio> findByUserEmail(String email) {
        try {
            // Intentamos obtener los portfolios por email
            List<Portfolio> portfolios = portfolioRepository.findByUserEmail(email);

            // Si la lista está vacía, lanzamos una excepción personalizada
            if (portfolios.isEmpty()) {
                throw new ResourceNotFoundException("No se encontraron portfolios para el usuario con email: " + email);
            }

            return portfolios;
        } catch (Exception ex) {
            // Si ocurre algún error en la consulta, lanzamos una excepción ResourceNotFoundException
            throw new ResourceNotFoundException("Error al obtener los portfolios para el email: " + email);
        }
    }

    @Override
    public Portfolio updateName(Long id,String name){
        Portfolio portfolioDb = portfolioRepository.findById(id).get();

        portfolioDb.setNombre(name);


        return portfolioRepository.save(portfolioDb);
    }
}
