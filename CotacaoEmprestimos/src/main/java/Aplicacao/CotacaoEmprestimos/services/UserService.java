package Aplicacao.CotacaoEmprestimos.services;

import Aplicacao.CotacaoEmprestimos.api.DTOs.UserDTO;
import Aplicacao.CotacaoEmprestimos.entities.User;
import Aplicacao.CotacaoEmprestimos.repository.UserRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
    public void updateUser(Long id, @RequestBody @NotNull UserDTO userDTO) {

        var userFromDB = userRepository.findById(id);
        if (userFromDB.isEmpty())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario não encontrado.");

        userFromDB.get().setUsername(userDTO.username());
        userFromDB.get().setPassword(passwordEncoder.encode(userDTO.password()));
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

    public User getUser(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario não encontrado."));
    }
}
