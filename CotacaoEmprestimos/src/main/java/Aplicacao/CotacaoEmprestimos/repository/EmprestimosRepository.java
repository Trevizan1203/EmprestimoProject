package Aplicacao.CotacaoEmprestimos.repository;

import Aplicacao.CotacaoEmprestimos.entities.Cliente;
import Aplicacao.CotacaoEmprestimos.entities.Emprestimo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmprestimosRepository extends JpaRepository<Emprestimo, Long> {
    Emprestimo getEmprestimoById(Long id);

    List<Emprestimo> getEmprestimoByCliente(Cliente cliente);
}
