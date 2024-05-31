package com.nebo.template.applications.model.template;

import com.fasterxml.jackson.annotation.JsonRootName;
import com.nebo.types.PageResponse;
import org.springframework.data.domain.Page;

@JsonRootName("templates")
public class TemplatesResponse extends PageResponse<TemplateResponse> {
    public TemplatesResponse(Page<TemplateResponse> page) {
        super(page);
    }
}
