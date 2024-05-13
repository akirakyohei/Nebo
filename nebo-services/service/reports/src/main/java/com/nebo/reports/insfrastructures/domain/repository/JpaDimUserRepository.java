package com.nebo.reports.insfrastructures.domain.repository;

import com.nebo.reports.insfrastructures.domain.model.DimUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JpaDimUserRepository extends JpaRepository<DimUser, Long> {
    Optional<DimUser> findDimUserByUserId(long userId);
}
