package Aplicacao.CotacaoEmprestimos.api.controller;

import Aplicacao.CotacaoEmprestimos.api.DTOs.ClienteDTO;
import Aplicacao.CotacaoEmprestimos.entities.Cliente;
import Aplicacao.CotacaoEmprestimos.entities.Emprestimo;
import Aplicacao.CotacaoEmprestimos.services.ClienteService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Clientes")
@RestController
@RequestMapping("/clientes")
@CrossOrigin(origins = "http://localhost:4200")
public class ClienteController {

    private ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @PostMapping
    public ResponseEntity<Void> createCliente(@RequestBody ClienteDTO dto) {
        clienteService.createCliente(dto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> getClienteById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(clienteService.getCliente(id));
    }

    @GetMapping("/getEmprestimos/{id}")
    public ResponseEntity<List<Emprestimo>> getEmprestimos(@PathVariable("id") Long id) {
        return ResponseEntity.ok(clienteService.getAllEmprestimosByCliente(id));
    }

    @GetMapping
    public ResponseEntity<List<Cliente>> getAllClientes() {
        return ResponseEntity.ok(clienteService.getAllClientes());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateCliente(@PathVariable("id") Long id, @RequestBody ClienteDTO dto) {
        clienteService.updateCliente(id, dto);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCliente(@PathVariable("id") Long id) {
        clienteService.deleteCliente(id);
        return ResponseEntity.noContent().build();
    }
}
