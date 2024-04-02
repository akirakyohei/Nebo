package com.nebo.sso.infrastructures.domain.repository;

import com.nebo.sso.infrastructures.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JpaUserRepository extends JpaRepository<User, Long> {

    Optional<User> findById(long id);

    Optional<User> findFirstByEmail(String email);

    Optional<User> findFirstByPhoneNumber(String phoneNumber);

    Optional<User> findFirstByEmailAndPassword(String email, String password);

    Optional<User> findFirstByPhoneNumberAndPassword(String phoneNumber, String password);

}
