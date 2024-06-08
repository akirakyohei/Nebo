package com.nebo.template.domain.repository;


import com.nebo.template.applications.model.template.TemplateFilterRequest;
import com.nebo.template.domain.model.Template;
import org.springframework.data.domain.Page;

public interface TemplateRepository {

    Page<Template> findAll(long userId, TemplateFilterRequest request);
}
