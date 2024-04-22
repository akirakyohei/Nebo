package com.nebo.reports.insfrastructures.domain.repository;

import com.nebo.reports.insfrastructures.domain.model.FactSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface JpaFactSessionRepository extends JpaRepository<FactSession, Long>, JpaSpecificationExecutor<FactSession> {
}
