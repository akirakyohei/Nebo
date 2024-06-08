package com.nebo.sso.domain.repository;

import com.nebo.sso.domain.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;

public interface JpaUserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {

    Optional<User> findById(long id);

    Optional<User> findFirstByEmail(String email);

    Optional<User> findFirstByPhoneNumber(String phoneNumber);

}
