package com.nebo.template.applications.model.template;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.*;

import java.util.Map;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonRootName("template_export")
public class TemplateExportRequest {

    private Map<String, Object> variables;
    private Format format = Format.pdf;

    public enum Format {
        pdf, html
    }
}
