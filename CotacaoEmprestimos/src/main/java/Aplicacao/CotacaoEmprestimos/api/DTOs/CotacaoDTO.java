package Aplicacao.CotacaoEmprestimos.api.DTOs;

public record CotacaoDTO (String moeda,
                          Double cotacaoCompra,
                          Double cotacaoVenda,
                          Double paridadeCompra,
                          Double paridadeVenda) {
}
