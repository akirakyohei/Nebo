package com.nebo.template.applications.model.template;

import com.nebo.template.domain.model.TemplateOption;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class TemplateOptionResponse {
    private String format;
    private String height;
    private String width;
    private boolean landscape;
    private TemplateOption.TemplateMarginOption margin;
}
