package Aplicacao.CotacaoEmprestimos.api.DTOs;

public record EmprestimoChartDTO(
        Long id,
        String status,
        Double valorFinal
) {
}
