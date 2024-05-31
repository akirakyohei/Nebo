package com.nebo.template.infrastructures.domain.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vladmihalcea.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Type;

@Entity
@Setter
@Getter
@Table(name="template_options")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TemplateOption {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long userId;

    @OneToOne(mappedBy = "options")
    private Template template;
    private String format;
    private String height;
    private String width;

    private boolean landscape;

    @Type(JsonType.class)
    private TemplateMarginOption margin;

    @Setter
    @Getter
    public static class TemplateMarginOption {
        private String top;
        private String left;
        private String bottom;
        private String right;
    }
}
