package MyPortfolio.Controllers;

import MyPortfolio.Services.StockPriceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StockPriceController {

    private final StockPriceService stockPriceService;

    @Autowired
    public StockPriceController(StockPriceService stockPriceService) {
        this.stockPriceService = stockPriceService;
    }

    @GetMapping("/stock/{symbol}")
    public String getStockPrice(@PathVariable String symbol) {
        return stockPriceService.getStockPrice(symbol);
    }

    @GetMapping("/crypto/{fromCurrency}/{toCurrency}")
    public String getCryptoPrice(@PathVariable String fromCurrency, @PathVariable String toCurrency) {
        return stockPriceService.getCryptoPrice(fromCurrency, toCurrency);
    }

    @GetMapping("/etf/{symbol}")
    public String getEtfPrice(@PathVariable String symbol) {
        return stockPriceService.getEtfPrice(symbol);
    }
}

