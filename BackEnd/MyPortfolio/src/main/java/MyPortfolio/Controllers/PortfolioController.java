package MyPortfolio.Controllers;

import MyPortfolio.Entities.Portfolio;
import MyPortfolio.Services.Impl.PortfolioService;
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

    @GetMapping("/email/{email}")
    public List<Portfolio> getPortfolioByEmail(@PathVariable String email) {
        return portfolioService.findByUserEmail(email);
    }

    @PatchMapping("/{id}")
    public Portfolio updateName( @PathVariable Long id,@RequestBody String name) {
        return portfolioService.updateName(id, name);

    }



}
