package com.nebo.reports.insfrastructures.domain.repository;

import com.nebo.reports.insfrastructures.domain.model.FactSession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaFactSessionRepository extends JpaRepository<FactSession, Long> {
}
