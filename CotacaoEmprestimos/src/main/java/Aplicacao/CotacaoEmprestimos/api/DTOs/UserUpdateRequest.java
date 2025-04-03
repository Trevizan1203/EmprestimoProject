package Aplicacao.CotacaoEmprestimos.api.DTOs;

public record UserUpdateRequest(
        String username,
        String email,
        String oldPassword,
        String newPassword,
        String confirmedPassword
) {}
