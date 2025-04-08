package MyPortfolio.Controller;

import MyPortfolio.Entity.Portfolio;
import MyPortfolio.Service.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/portfolio")
public class PortfolioController {

    @Autowired
    private final PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @PostMapping
    public Portfolio register(@RequestBody Portfolio portfolio){
        return portfolioService.register(portfolio);
    }

    @GetMapping("/user/{id}")
    public List<Portfolio> getPortfoliosByUser(@PathVariable Long id){
        return portfolioService.getPortfoliosByUser(id);
    }

    @GetMapping("/{id}")
    public Portfolio getPortfolioById(@PathVariable Long id){
        return portfolioService.getById(id);
    }

    @PutMapping
    public Portfolio update(@RequestBody Portfolio portfolio){
        return portfolioService.update(portfolio);
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        portfolioService.delete(id);
    }

}
