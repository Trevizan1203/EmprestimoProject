package Aplicacao.CotacaoEmprestimos.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Emprestimo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "cliente_id", nullable = false)
    @JsonBackReference
    private Cliente cliente;

    private LocalDate dataEmprestimo;
    private String moeda;
    private Double taxaConversao;
    private LocalDate dataVencimento;
    private Double valorObtido;
    private long meses;
    private Double valorFinal;
    private boolean pago = false;

    public String getStatus() {
        if (dataVencimento.isBefore(LocalDate.now()) && pago == false)
            return "atrasado";
        else if((dataVencimento.isAfter(LocalDate.now()) || dataVencimento.isEqual(LocalDate.now())) && pago == false)
            return "andamento";
        return "pago";
    }

    public void pagarEmprestimo() {
        this.pago = true;
    }

    public long getMeses() {
        return meses;
    }

    public void setMeses(long meses) {
        this.meses = meses;
    }

    public Double getValorFinal() {
        return valorFinal;
    }

    public void setValorFinal(Double valorFinal) {
        this.valorFinal = valorFinal;
    }

    public Long getId() {
        return id;
    }

    public String getMoeda() {
        return moeda;
    }

    public void setMoeda(String moeda) {
        this.moeda = moeda;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public LocalDate getDataEmprestimo() {
        return dataEmprestimo;
    }

    public void setDataEmprestimo(LocalDate dataEmprestimo) {
        this.dataEmprestimo = dataEmprestimo;
    }

    public Double getTaxaConversao() {
        return taxaConversao;
    }

    public void setTaxaConversao(Double taxaConversao) {
        this.taxaConversao = taxaConversao;
    }

    public LocalDate getDataVencimento() {
        return dataVencimento;
    }

    public void setDataVencimento(LocalDate dataVencimento) {
        this.dataVencimento = dataVencimento;
    }

    public Double getValorObtido() {
        return valorObtido;
    }

    public void setValorObtido(Double valorObtido) {
        this.valorObtido = valorObtido;
    }
}
