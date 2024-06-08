package com.nebo.template.domain.repository;

import com.nebo.template.domain.model.PaperType;
import org.springframework.data.jpa.repository.JpaRepository;


public interface JpaPaperTypeRepository extends JpaRepository<PaperType, Integer> {
}
