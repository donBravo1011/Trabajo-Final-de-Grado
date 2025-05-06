package MyPortfolio.Controllers;

import MyPortfolio.Entities.Portfolio;
import MyPortfolio.Exceptions.ResourceNotFoundException;
import MyPortfolio.Services.Impl.PortfolioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> getPortfoliosByUser(@PathVariable Long id) {
        try {
            List<Portfolio> portfolios = portfolioService.getPortfoliosByUser(id);
            return ResponseEntity.ok(portfolios);  // Si el usuario existe y se encuentran los portfolios, retornamos 200 OK con la lista
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());  // Si no se encuentra el usuario, retornamos 404 Not Found con el mensaje de error
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getPortfolioById(@PathVariable Long id) {
        try {
            Portfolio portfolio = portfolioService.getById(id);
            return ResponseEntity.ok(portfolio);  // Si el Portfolio se encuentra, devolvemos 200 OK con el objeto
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());  // Si no se encuentra, devolvemos 404 con el mensaje de error
        }
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
    public ResponseEntity<?> getPortfolioByEmail(@PathVariable String email) {
        try {
            List<Portfolio> portfolios = portfolioService.findByUserEmail(email);
            return ResponseEntity.ok(portfolios);  // Si se encuentran los portfolios, devolvemos 200 OK con la lista
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());  // Si no se encuentran, devolvemos 404 Not Found con el mensaje de error
        }
    }

    @PatchMapping("/{id}")
    public Portfolio updateName( @PathVariable Long id,@RequestBody String name) {
        return portfolioService.updateName(id, name);

    }



}
