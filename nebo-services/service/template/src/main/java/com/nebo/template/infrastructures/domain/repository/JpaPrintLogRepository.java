package com.nebo.template.infrastructures.domain.repository;

import com.nebo.template.infrastructures.domain.model.PrintLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaPrintLogRepository extends JpaRepository<PrintLog,Long> {
}
