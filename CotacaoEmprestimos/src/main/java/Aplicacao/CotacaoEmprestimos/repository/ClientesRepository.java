package Aplicacao.CotacaoEmprestimos.repository;

import Aplicacao.CotacaoEmprestimos.entities.Cliente;
import Aplicacao.CotacaoEmprestimos.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClientesRepository extends JpaRepository<Cliente, Long> {
    Optional<Cliente> findByEmail(String email);

    Optional<Cliente> findByCpf(String cpf);

    Optional<Cliente> findByTelefone(String telefone);

    List<Cliente> findAllByUserId(Long userId);
}
