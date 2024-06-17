package com.nebo.template.applications.model.template;

import com.fasterxml.jackson.annotation.JsonRootName;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Map;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonRootName("template_preview")
public class TemplatePreviewRequest {

    @NotNull
    private String html;
    private Map<String, Object> variables;

    private TemplateOptionResponse options;

    private Format format = Format.pdf;

    public enum Format {
        pdf, html
    }
}
