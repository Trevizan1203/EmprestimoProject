package Aplicacao.CotacaoEmprestimos.api.controller;

import Aplicacao.CotacaoEmprestimos.api.DTOs.ClienteDTO;
import Aplicacao.CotacaoEmprestimos.entities.Cliente;
import Aplicacao.CotacaoEmprestimos.entities.Emprestimo;
import Aplicacao.CotacaoEmprestimos.services.ClienteService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Clientes")
@RestController
@RequestMapping("/clientes")
public class ClienteController {

    private ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @PostMapping
    public ResponseEntity<Void> createCliente(@RequestBody ClienteDTO dto, JwtAuthenticationToken token) {
        clienteService.createCliente(dto, token);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> getClienteById(@PathVariable("id") Long id, JwtAuthenticationToken token) {
        return ResponseEntity.ok(clienteService.getCliente(id, token));
    }

    @GetMapping("/getEmprestimos/{id}")
    public ResponseEntity<List<Emprestimo>> getEmprestimos(@PathVariable("id") Long id, JwtAuthenticationToken token) {
        return ResponseEntity.ok(clienteService.getAllEmprestimosByCliente(id, token));
    }

    @GetMapping
    public ResponseEntity<List<Cliente>> getAllClientes() {
        return ResponseEntity.ok(clienteService.getAllClientes());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateCliente(@PathVariable("id") Long id, @RequestBody ClienteDTO dto, JwtAuthenticationToken token) {
        clienteService.updateCliente(id, dto, token);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCliente(@PathVariable("id") Long id, JwtAuthenticationToken token) {
        clienteService.deleteCliente(id, token);
        return ResponseEntity.noContent().build();
    }
}
