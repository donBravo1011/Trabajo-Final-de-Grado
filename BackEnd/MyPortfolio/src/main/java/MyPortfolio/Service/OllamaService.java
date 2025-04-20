package MyPortfolio.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.Map;

@Service
public class OllamaService {

    private final RestTemplate restTemplate;

    @Autowired
    public OllamaService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String preguntar(String prompt) {
        String url = "http://localhost:11434/api/generate";

        // Construir el cuerpo de la petición
        Map<String, Object> payload = Map.of(
                "model", "llama3.2",
                "prompt", prompt,
                "stream", false  // Desactivamos el streaming por simplicidad
        );

        // Crear el encabezado
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Crear la entidad con el cuerpo y los encabezados
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(payload, headers);

        // Enviar la petición POST
        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);

        // Obtener la respuesta
        if (response.getStatusCode() == HttpStatus.OK) {
            return (String) response.getBody().get("response");
        } else {
            return "Error: No se pudo procesar la petición";
        }
    }
}
