package com.nebo.template.domain.repository;

import com.nebo.template.domain.model.PrintLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaPrintLogRepository extends JpaRepository<PrintLog,Long> {
}
