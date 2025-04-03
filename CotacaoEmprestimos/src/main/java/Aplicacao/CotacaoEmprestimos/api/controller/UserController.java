package Aplicacao.CotacaoEmprestimos.api.controller;

import Aplicacao.CotacaoEmprestimos.api.DTOs.LoginRequestDTO;
import Aplicacao.CotacaoEmprestimos.api.DTOs.LoginResponseDTO;
import Aplicacao.CotacaoEmprestimos.api.DTOs.UserDTO;
import Aplicacao.CotacaoEmprestimos.entities.User;
import Aplicacao.CotacaoEmprestimos.services.TokenService;
import Aplicacao.CotacaoEmprestimos.services.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@Tag(name = "Usuarios")
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final TokenService tokenService;

    public UserController(UserService userService, TokenService tokenService) {
        this.userService = userService;
        this.tokenService = tokenService;
    }

    @PostMapping
    public ResponseEntity<Void> createUser(@RequestBody UserDTO userDTO) {
        userService.createUser(userDTO);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginRequest) {
        return ResponseEntity.ok(tokenService.login(loginRequest));
    }

    @GetMapping
    public ResponseEntity<User> getUser(JwtAuthenticationToken token) {
        return ResponseEntity.ok(userService.getUserByToken(token));
    }

}
