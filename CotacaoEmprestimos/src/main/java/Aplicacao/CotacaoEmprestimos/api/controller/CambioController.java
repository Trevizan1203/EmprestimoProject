package Aplicacao.CotacaoEmprestimos.api.controller;

import Aplicacao.CotacaoEmprestimos.api.DTOs.CotacaoDTO;
import Aplicacao.CotacaoEmprestimos.services.CambioService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@Tag(name = "Cambio")
@RestController
@RequestMapping("/cambio")
public class CambioController {

    private CambioService cambioService;

    public CambioController(CambioService cambioService) {
        this.cambioService = cambioService;
    }

    @GetMapping("/get")
    public ResponseEntity<Optional<CotacaoDTO>> getCambio(String moeda) {
        return ResponseEntity.ok(cambioService.obterTaxaCambio(moeda));
    }
}
