package MyPortfolio.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "transactions")
//@Getter @Setter
//@NoArgsConstructor @AllArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionType tipo;  // Compra o Venta

    @Column(nullable = false)
    private String assetId;  // ID del activo en la API externa (ej: "AAPL", "BTC", "VOO")

    @Column(nullable = false)
    private Double cantidad;

    @Column(nullable = false)
    private Double precio; // Precio por unidad en el momento de la transacción

    @Column(nullable = false)
    private LocalDate fecha; // Fecha de la transacción

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "portfolio_id", nullable = false)
    private Portfolio portfolio;

    public Transaction() {
    }

    public Transaction(Long id, TransactionType tipo, String assetId, Double cantidad, Double precio, LocalDate fecha, Portfolio portfolio) {
        this.id = id;
        this.tipo = tipo;
        this.assetId = assetId;
        this.cantidad = cantidad;
        this.precio = precio;
        this.fecha = fecha;
        this.portfolio = portfolio;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public TransactionType getTipo() {
        return tipo;
    }

    public void setTipo(TransactionType tipo) {
        this.tipo = tipo;
    }

    public String getAssetId() {
        return assetId;
    }

    public void setAssetId(String assetId) {
        this.assetId = assetId;
    }

    public Double getCantidad() {
        return cantidad;
    }

    public void setCantidad(Double cantidad) {
        this.cantidad = cantidad;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public void setFecha(LocalDate fecha) {
        this.fecha = fecha;
    }

    public Portfolio getPortfolio() {
        return portfolio;
    }

    public void setPortfolio(Portfolio portfolio) {
        this.portfolio = portfolio;
    }
}
