package Aplicacao.CotacaoEmprestimos.repository;

import Aplicacao.CotacaoEmprestimos.entities.Emprestimo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmprestimosRepository extends JpaRepository<Emprestimo, Long> {
}
