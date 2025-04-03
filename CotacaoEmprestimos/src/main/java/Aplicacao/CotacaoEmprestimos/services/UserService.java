package Aplicacao.CotacaoEmprestimos.services;

import Aplicacao.CotacaoEmprestimos.api.DTOs.UserDTO;
import Aplicacao.CotacaoEmprestimos.api.DTOs.UserUpdateRequest;
import Aplicacao.CotacaoEmprestimos.entities.User;
import Aplicacao.CotacaoEmprestimos.repository.UserRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    private void verificaEmailUnico(String email, Long userId) {
        var userFromEmail = userRepository.findByEmail(email);
        if (userFromEmail.isPresent() && (userId == null || !userFromEmail.get().getId().equals(userId))) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email já cadastrado");
        }
    }

    @Transactional
    public void createUser (@RequestBody @NotNull UserDTO userDTO) {
        var userFromDB = userRepository.findByEmail(userDTO.email());
        if(userFromDB.isPresent())
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email já cadastrado.");

        User user = new User();

        user.setEmail(userDTO.email());
        user.setPassword(passwordEncoder.encode(userDTO.password()));
        user.setUsername(userDTO.username());

        userRepository.save(user);
    }

    @Transactional
    public void updateUser(@RequestBody @NotNull UserUpdateRequest userDTO, JwtAuthenticationToken token) {
        Long id = Long.valueOf(token.getName());

        var userFromDB = userRepository.findById(id);
        if (userFromDB.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario não encontrado.");
        verificaEmailUnico(userDTO.email(), id);

        if (passwordEncoder.matches(userDTO.oldPassword(), userFromDB.get().getPassword()) && (!userDTO.newPassword().isBlank() && !userDTO.confirmedPassword().isBlank())) {
            if (userDTO.newPassword().equals(userDTO.confirmedPassword()))
                userFromDB.get().setPassword(passwordEncoder.encode(userDTO.newPassword()));
        } else
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Senha incorreta ou diferentes.");

        if(!userDTO.username().isBlank())
            userFromDB.get().setUsername(userDTO.username());
        if(!userDTO.email().isBlank())
            userFromDB.get().setEmail(userDTO.email());

        userRepository.save(userFromDB.get());
    }

    @Transactional
    public void deleteUser(Long id) {
        var userFromDB = userRepository.findById(id);
        if (userFromDB.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario não encontrado.");

        userRepository.delete(userFromDB.get());
    }

    public User getUserByToken(JwtAuthenticationToken token) {
        return userRepository.findById(Long.valueOf(token.getName())).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario não encontrado."));
    }
}
