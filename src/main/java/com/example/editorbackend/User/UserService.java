package com.example.editorbackend.User;

import com.example.editorbackend.RequestBodyParams.UserReqs;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {

    UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void create(String username, String password) {

        Optional<UserEntity> userExists = userRepository.findByUsernameIgnoreCase(username);

        if (userExists.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        UserEntity user = new UserEntity(username, password);

        userRepository.save(user);

        throw new ResponseStatusException(HttpStatus.ACCEPTED);
    }

    public UserEntity login(String email, String password) {

        Optional<UserEntity> userExists = userRepository.findByUsernameIgnoreCaseAndPassword(email, password);

        if (userExists.isEmpty()) {

            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);
        }

        UserEntity user = userExists.get();


        if (!Objects.equals(user.role, "editor")) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED);
        }

        return user;
    }
}
