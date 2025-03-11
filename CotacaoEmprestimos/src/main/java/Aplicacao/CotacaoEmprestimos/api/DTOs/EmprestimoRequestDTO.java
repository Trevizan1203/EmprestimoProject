package Aplicacao.CotacaoEmprestimos.api.DTOs;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record EmprestimoRequestDTO(Long clienteId,
                                   String dataEmprestimo,
                                   String moeda,
                                   Double valorObtido,
                                   String dataVencimento) {
}
