package Aplicacao.CotacaoEmprestimos.api.controller;

import Aplicacao.CotacaoEmprestimos.api.DTOs.EmprestimoChartDTO;
import Aplicacao.CotacaoEmprestimos.api.DTOs.EmprestimoRequestDTO;
import Aplicacao.CotacaoEmprestimos.entities.Emprestimo;
import Aplicacao.CotacaoEmprestimos.services.EmprestimoService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Emprestimo")
@RestController
@RequestMapping("/emprestimos")
public class EmprestimoController {

    private final EmprestimoService emprestimoService;

    public EmprestimoController(EmprestimoService emprestimoService) {
        this.emprestimoService = emprestimoService;
    }

    @PostMapping
    public ResponseEntity<Void> createEmprestimo(@RequestBody EmprestimoRequestDTO dto) {
        emprestimoService.createEmprestimo(dto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Emprestimo> geEmprestimoById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(emprestimoService.getEmprestimoById(id));
    }

    @GetMapping
    public ResponseEntity<List<Emprestimo>> listEmprestimos() {
        return ResponseEntity.ok(emprestimoService.getAllEmprestimos());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateEmprestimo(@PathVariable("id") Long id, @RequestBody EmprestimoRequestDTO dto) {
        emprestimoService.updateEmprestimo(id, dto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmprestimo(@PathVariable("id") Long id) {
        emprestimoService.deleteEmprestimoById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/info")
    public ResponseEntity<List<EmprestimoChartDTO>> getEmprestimosCharts(JwtAuthenticationToken token) {
        return ResponseEntity.ok(emprestimoService.getAllEmprestimoChart(token));
    }

    @PatchMapping("/pagar/{id}")
    public ResponseEntity<Void> pagarEmprestimo(@PathVariable("id") Long id) {
        emprestimoService.pagarEmprestimo(id);
        return ResponseEntity.ok().build();
    }
}