package MyPortfolio.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class StockPriceService {

    private final RestTemplate restTemplate;
    private final String apiKey;

    public StockPriceService(RestTemplate restTemplate, @Value("${alpha.vantage.api.key}") String apiKey) {
        this.restTemplate = restTemplate;
        this.apiKey = apiKey;
    }

    public String getStockPrice(String symbol) {
        String url = "https://www.alphavantage.co/query";
        String function = "TIME_SERIES_INTRADAY";
        String interval = "5min";  // Puedes elegir el intervalo que prefieras (1min, 5min, 15min, etc.)

        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("function", function)
                .queryParam("symbol", symbol)
                .queryParam("interval", interval)
                .queryParam("apikey", apiKey);

        try {
            // Obtener los datos de la API
            String response = restTemplate.getForObject(builder.toUriString(), String.class);

            // Usar Jackson para parsear la respuesta JSON
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(response);
            JsonNode timeSeriesNode = rootNode.path("Time Series (5min)");

            // Extraer el último timestamp disponible en la serie temporal
            String lastTimestamp = getLastTimestamp(timeSeriesNode);

            // Obtener los datos de la última entrada
            JsonNode latestData = timeSeriesNode.path(lastTimestamp);

            // Obtener el precio de cierre más reciente
            String latestClosePrice = latestData.path("4. close").asText();

            return "El precio actual de la acción " + symbol + " es: $" + latestClosePrice;
        } catch (HttpClientErrorException e) {
            // Maneja el error aquí (si es necesario)
            return "Error al obtener los datos: " + e.getMessage();
        } catch (Exception e) {
            // Manejo de otras excepciones
            return "Error al procesar la respuesta: " + e.getMessage();
        }
    }

    public String getCryptoPrice(String fromCurrency, String toCurrency) {
        String url = "https://www.alphavantage.co/query";
        String function = "CURRENCY_EXCHANGE_RATE";  // Para criptomonedas

        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("function", function)
                .queryParam("from_currency", fromCurrency)  // La criptomoneda (BTC, ETH, etc.)
                .queryParam("to_currency", toCurrency)      // La moneda de destino (USD, EUR, etc.)
                .queryParam("apikey", apiKey);

        try {
            // Obtener los datos de la API
            String response = restTemplate.getForObject(builder.toUriString(), String.class);

            // Usar Jackson para parsear la respuesta JSON
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(response);
            JsonNode exchangeRateNode = rootNode.path("Realtime Currency Exchange Rate");

            // Obtener el precio de cambio (precio actual de la criptomoneda)
            String exchangeRate = exchangeRateNode.path("5. Exchange Rate").asText();

            return "El precio actual de " + fromCurrency + " en " + toCurrency + " es: " + exchangeRate;
        } catch (HttpClientErrorException e) {
            // Maneja el error aquí (si es necesario)
            return "Error al obtener los datos: " + e.getMessage();
        } catch (Exception e) {
            // Manejo de otras excepciones
            return "Error al procesar la respuesta: " + e.getMessage();
        }
    }

    public String getEtfPrice(String symbol) {
        String url = "https://www.alphavantage.co/query";
        String function = "TIME_SERIES_INTRADAY";  // Para acciones y ETFs
        String interval = "5min";  // Intervalo de 5 minutos

        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("function", function)
                .queryParam("symbol", symbol)
                .queryParam("interval", interval)
                .queryParam("apikey", apiKey);

        try {
            // Obtener los datos de la API
            String response = restTemplate.getForObject(builder.toUriString(), String.class);

            // Usar Jackson para parsear la respuesta JSON
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(response);
            JsonNode timeSeriesNode = rootNode.path("Time Series (5min)");

            // Extraer el último timestamp disponible en la serie temporal
            String lastTimestamp = getLastTimestamp(timeSeriesNode);

            // Obtener los datos de la última entrada
            JsonNode latestData = timeSeriesNode.path(lastTimestamp);

            // Obtener el precio de cierre más reciente
            String latestClosePrice = latestData.path("4. close").asText();

            return "El precio actual del ETF " + symbol + " es: $" + latestClosePrice;
        } catch (HttpClientErrorException e) {
            // Maneja el error aquí (si es necesario)
            return "Error al obtener los datos: " + e.getMessage();
        } catch (Exception e) {
            // Manejo de otras excepciones
            return "Error al procesar la respuesta: " + e.getMessage();
        }
    }

    // Método para obtener la última clave de timestamp (es decir, la más reciente)
    private String getLastTimestamp(JsonNode timeSeriesNode) {
        // La serie de tiempo ya está ordenada por fecha, por lo tanto, podemos simplemente obtener el primer nodo
        // para obtener la última entrada.
        return timeSeriesNode.fieldNames().next(); // Devuelve el primer nombre de campo (el último timestamp)
    }
}


