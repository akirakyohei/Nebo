package com.nebo.template.domain.model;


import com.nebo.shared.common.persistences.ListIntegerConverter;
import com.vladmihalcea.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.*;
import org.apache.commons.lang3.SerializationUtils;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.io.Serializable;
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
public class Template implements Serializable {

    private static final long serialVersionUID = 1L;
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
    private Long thumbnailImageId;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    private SharedStatus sharedStatus = SharedStatus.only_you;
    private long size;
    @CreationTimestamp
    private Instant createdAt;
    @UpdateTimestamp
    private Instant updatedAt;


    @PrePersist
    @PreUpdate
    public void sumData() {
        countTotalData();
    }

    private void countTotalData() {
        var data = SerializationUtils.serialize(this);
        this.size = data.length;
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
