package MyPortfolio.Controllers;

import MyPortfolio.Services.OllamaService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestController
public class OllamaController {

    private final OllamaService ollamaService;

    public OllamaController(OllamaService ollamaService) {
        this.ollamaService = ollamaService;
    }

    @PostMapping("/preguntar")
    public ResponseEntity<String> preguntar(@RequestBody PreguntaRequest request) {
        String respuesta = ollamaService.preguntar(request.getPregunta());
        return ResponseEntity.ok(respuesta);
    }

    public static class PreguntaRequest {
        private String pregunta;

        public String getPregunta() {
            return pregunta;
        }

        public void setPregunta(String pregunta) {
            this.pregunta = pregunta;
        }
    }
}
