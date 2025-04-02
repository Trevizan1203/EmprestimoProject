package Aplicacao.CotacaoEmprestimos.services;

import Aplicacao.CotacaoEmprestimos.api.DTOs.ClienteDTO;
import Aplicacao.CotacaoEmprestimos.entities.Cliente;
import Aplicacao.CotacaoEmprestimos.entities.Emprestimo;
import Aplicacao.CotacaoEmprestimos.repository.ClientesRepository;
import Aplicacao.CotacaoEmprestimos.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ClienteService {

    private final ClientesRepository clientesRepository;
    private final UserRepository userRepository;

    public ClienteService(ClientesRepository clientesRepository, UserRepository userRepository) {
        this.clientesRepository = clientesRepository;
        this.userRepository = userRepository;
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

    public void verificaUsuarioCliente(Long clientId, JwtAuthenticationToken token) {
        var userFromDB = userRepository.findById(Long.valueOf(token.getName()));
        if(userFromDB.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario não encontrado.");

        var clienteFromDB = clientesRepository.findById(clientId);
        if (clienteFromDB.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado");

        if(!clienteFromDB.get().getUser().equals(userFromDB.get()))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Usuário não tem acesso à esse cliente.");
    }

    @Transactional
    public void createCliente(@RequestBody ClienteDTO dto, JwtAuthenticationToken token) {
        var userFromDB = userRepository.findById(Long.valueOf(token.getName()));
        if(userFromDB.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario não encontrado.");
        }

        verificarDadosUnicos(dto, null);

        Cliente novoCliente = new Cliente();
        novoCliente.setUser(userFromDB.get());
        novoCliente.setEmail(dto.email());
        novoCliente.setNome(dto.nome());
        novoCliente.setCpf(dto.cpf());
        novoCliente.setTelefone(dto.telefone());

        clientesRepository.save(novoCliente);
    }

    public Cliente getCliente(Long id, JwtAuthenticationToken token) {
        verificaUsuarioCliente(id, token);
        return clientesRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));
    }

    @Transactional
    public void updateCliente(Long id, @RequestBody ClienteDTO dto, JwtAuthenticationToken token) {

        verificaUsuarioCliente(id, token);

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
    public void deleteCliente(Long id, JwtAuthenticationToken token) {
        verificaUsuarioCliente(id, token);
        Cliente cliente = clientesRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cliente não encontrado"));
        clientesRepository.deleteById(cliente.getId());
    }

    public List<Emprestimo> getAllEmprestimosByCliente(Long id, JwtAuthenticationToken token) {
        verificaUsuarioCliente(id, token);
        var clienteFromDB = clientesRepository.findById(id);
        if(clienteFromDB.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario nao encontrado");
        return clienteFromDB.get().getEmprestimos();
    }

    public List<Cliente> getAllClientesByUser(JwtAuthenticationToken token) {
        return clientesRepository.findAllByUserId(Long.valueOf(token.getName()));
    }

}
