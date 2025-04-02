package Aplicacao.CotacaoEmprestimos.api.controller;

import Aplicacao.CotacaoEmprestimos.api.DTOs.LoginRequestDTO;
import Aplicacao.CotacaoEmprestimos.api.DTOs.LoginResponseDTO;
import Aplicacao.CotacaoEmprestimos.services.TokenService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TokenController {

    private final TokenService tokenService;

    public TokenController(TokenService tokenService) {
        this.tokenService = tokenService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginRequest) {
        return ResponseEntity.ok(tokenService.login(loginRequest));
    }
}
