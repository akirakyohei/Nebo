package com.nebo.template.infrastructures.domain.repository;

import com.nebo.template.infrastructures.domain.model.PaperType;
import org.springframework.data.jpa.repository.JpaRepository;


public interface JpaPaperTypeRepository extends JpaRepository<PaperType, Integer> {
}
