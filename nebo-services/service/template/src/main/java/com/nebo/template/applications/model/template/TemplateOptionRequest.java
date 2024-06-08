package com.nebo.template.applications.model.template;

import com.nebo.template.domain.model.TemplateOption;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TemplateOptionRequest {
    private String format;
    private String height;
    private String width;
    private Boolean landscape;
    private TemplateOption.TemplateMarginOption margin;
}
