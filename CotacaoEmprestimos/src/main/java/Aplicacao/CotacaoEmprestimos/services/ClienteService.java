package Aplicacao.CotacaoEmprestimos.services;

import Aplicacao.CotacaoEmprestimos.api.DTOs.ClienteDTO;
import Aplicacao.CotacaoEmprestimos.entities.Cliente;
import Aplicacao.CotacaoEmprestimos.entities.Emprestimo;
import Aplicacao.CotacaoEmprestimos.repository.ClientesRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ClienteService {

    private final ClientesRepository clientesRepository;

    public ClienteService(ClientesRepository clientesRepository) {
        this.clientesRepository = clientesRepository;
    }

    public void verificarDadosUnicos(ClienteDTO dto, Long idCliente) {

        var clienteFromDB = clientesRepository.findByEmail(dto.email());
        if (clienteFromDB.isPresent() && (idCliente == null || !clienteFromDB.get().getId().equals(idCliente))) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email já cadastrado");
        }

        var clienteFromCpf = clientesRepository.findByCpf(dto.cpf());
        if (clienteFromCpf.isPresent() && (idCliente == null || !clienteFromCpf.get().getId().equals(idCliente))) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "CPF já cadastrado");
        }

        var clienteFromTelefone = clientesRepository.findByTelefone(dto.telefone());
        if (clienteFromTelefone.isPresent() && (idCliente == null || !clienteFromTelefone.get().getId().equals(idCliente))) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Telefone já cadastrado");
        }
    }

    @Transactional
    public void createCliente(@RequestBody ClienteDTO dto) {
        verificarDadosUnicos(dto, null);

        Cliente novoCliente = new Cliente();
        novoCliente.setEmail(dto.email());
        novoCliente.setNome(dto.nome());
        novoCliente.setCpf(dto.cpf());
        novoCliente.setTelefone(dto.telefone());

        clientesRepository.save(novoCliente);
    }

    public Cliente getCliente(Long id) {
        return clientesRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));
    }

    @Transactional
    public void updateCliente(Long id, @RequestBody ClienteDTO dto) {

        var clienteFromDB = clientesRepository.findById(id);
        if (clienteFromDB.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado");

        verificarDadosUnicos(dto, id);

        if(!dto.cpf().isBlank())
            clienteFromDB.get().setCpf(dto.cpf());
        if(!dto.telefone().isBlank())
            clienteFromDB.get().setTelefone(dto.telefone());
        if(!dto.email().isBlank())
            clienteFromDB.get().setEmail(dto.email());
        if(!dto.nome().isBlank())
            clienteFromDB.get().setNome(dto.nome());

        clientesRepository.save(clienteFromDB.get());
    }

    @Transactional
    public void deleteCliente(long id) {
        Cliente cliente = clientesRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));
        clientesRepository.deleteById(cliente.getId());
    }

    public List<Emprestimo> getAllEmprestimosByCliente(long id) {
        var clienteFromDB = clientesRepository.findById(id);
        if(clienteFromDB.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario nao encontrado");
        return clienteFromDB.get().getEmprestimos();
    }

    public List<Cliente> getAllClientes() {
        return clientesRepository.findAll();
    }

}
