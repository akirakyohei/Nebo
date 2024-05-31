package com.nebo.template.applications.model.template;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.nebo.template.infrastructures.domain.model.Template;
import com.nebo.template.infrastructures.domain.model.TemplateOption;
import com.vladmihalcea.hibernate.type.json.JsonType;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

@Setter
@Getter
public class TemplateOptionResponse {
    private String format;
    private String height;
    private String width;
    private boolean landscape;
    private TemplateOption.TemplateMarginOption margin;
}
