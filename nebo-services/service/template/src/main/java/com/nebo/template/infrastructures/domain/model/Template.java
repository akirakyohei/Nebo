package com.nebo.template.infrastructures.domain.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.nebo.persistences.ListIntegerConverter;
import com.nebo.persistences.ListStringConverter;
import com.vladmihalcea.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Type;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Map;

@Setter
@Getter
@Table(name = "templates")
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Template {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long userId;
    private String name;
    private int paperTypeId;
    @Convert(converter = ListIntegerConverter.class)
    private List<Integer> categoryIds;

    @Type(JsonType.class)
    private List<Object> assets;
    @Type(JsonType.class)
    private List<Object> components;
    private String css;
    @Type(JsonType.class)
    private List<Object> styles;
    private String html;
    @Type(JsonType.class)
    private Map<String, Object> fieldSchema;
    @Type(JsonType.class)
    private Map<String, Object> testData;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "option_id", referencedColumnName = "id")
    private TemplateOption options;

    @Builder.Default
    private boolean active = true;
    private boolean trashed;
    private Long thumbnailImageId;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    private SharedStatus sharedStatus = SharedStatus.only_you;
    private long size;
    private Timestamp createdAt;
    private Timestamp updatedAt;

    public void setHtml(String html) {
        this.html = html;
        this.size = html.getBytes().length;
    }

    public void setUserId(long userId) {
        this.userId = userId;
        if (options != null)
            options.setUserId(userId);
    }

    public void setOptions(TemplateOption options) {
        this.options = options;
        options.setTemplate(this);
        options.setUserId(this.getUserId());
    }

    public enum SharedStatus {
        only_you,
        allow_all,
        share_many
    }
}
