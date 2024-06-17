package com.nebo.template.domain.model;

import com.vladmihalcea.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Type;

import java.io.Serializable;

@Entity
@Setter
@Getter
@Table(name = "template_options")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TemplateOption implements Serializable {
    private static final long serialVersionUID = 1L;
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
    public static class TemplateMarginOption implements Serializable {
        private static final long serialVersionUID = 1L;
        private String top;
        private String left;
        private String bottom;
        private String right;
    }
}
