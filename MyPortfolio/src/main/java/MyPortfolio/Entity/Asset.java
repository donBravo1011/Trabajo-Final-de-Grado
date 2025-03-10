package MyPortfolio.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "assets")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Asset {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AssetType tipo;  // Tipo de activo: acción, crypto, ETF, etc.

    private String ticker;  // Solo para acciones, ETFs y cryptos

    @Column(nullable = false)
    private Double precioCompra;  // Precio de compra en su momento

    @Column(nullable = false)
    private Double cantidad;  // Cantidad comprada del activo

    private LocalDate fechaAdquisicion;  // Fecha de compra o adquisición

    @ManyToOne
    @JoinColumn(name = "portfolio_id", nullable = false)
    private Portfolio portfolio;  // El portafolio al que pertenece este activo

    @OneToMany(mappedBy = "asset", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Transaction> transactions;  // Lista de transacciones asociadas a este activo
}
