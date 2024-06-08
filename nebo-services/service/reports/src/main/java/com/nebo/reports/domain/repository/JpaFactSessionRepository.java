package com.nebo.reports.domain.repository;

import com.nebo.reports.domain.model.FactSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface JpaFactSessionRepository extends JpaRepository<FactSession, Long>, JpaSpecificationExecutor<FactSession> {
}
