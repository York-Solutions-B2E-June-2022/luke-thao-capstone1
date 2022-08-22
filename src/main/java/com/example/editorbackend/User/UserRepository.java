package com.example.editorbackend.User;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<UserEntity, Long> {

    Optional<UserEntity> findByUsernameIgnoreCase(String email);

    Optional<UserEntity> findByUsernameIgnoreCaseAndPassword(String email, String password);

}
