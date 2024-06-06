package com.nebo.template.infrastructures.domain.repository;


import com.nebo.template.applications.model.template.TemplateFilterRequest;
import com.nebo.template.infrastructures.domain.model.Template;
import org.springframework.data.domain.Page;

public interface TemplateRepository {

    Page<Template> findAll(long userId, TemplateFilterRequest request);
}
