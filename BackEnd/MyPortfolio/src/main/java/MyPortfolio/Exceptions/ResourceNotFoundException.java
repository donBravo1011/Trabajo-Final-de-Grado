package MyPortfolio.Exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {

    // Constructor que acepta un mensaje personalizado
    public ResourceNotFoundException(String message) {
        super(message);
    }

    // Constructor por defecto (por si necesitas usarlo sin mensaje)
    public ResourceNotFoundException() {
        super("Recurso no encontrado");
    }
}
