package Aplicacao.CotacaoEmprestimos.api.DTOs;

import java.time.LocalDate;

public record EmprestimoChartDTO(
        Long id,
        String status,
        Double valorFinal,
        Double valorObtido,
        LocalDate dataEmprestimo,
        LocalDate dataVencimento
) {
}
