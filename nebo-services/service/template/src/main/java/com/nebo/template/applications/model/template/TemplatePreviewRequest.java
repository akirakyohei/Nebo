package com.nebo.template.applications.model.template;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.*;

import java.util.Map;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonRootName("template_print")
public class TemplatePreviewRequest {
    private String html;
    private Map<String, Object> variables;
    private boolean fillData;

    private TemplateOptionResponse options;
}
