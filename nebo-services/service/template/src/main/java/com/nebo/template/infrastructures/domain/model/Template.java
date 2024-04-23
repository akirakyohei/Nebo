package com.nebo.template.infrastructures.domain.model;


import com.nebo.persistences.ListIntegerConverter;
import com.vladmihalcea.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Type;

import java.sql.Timestamp;
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
    private Map<String, Object> data;
    @Type(JsonType.class)
    private Map<String, Object> params;
    private long size;
    private Timestamp createdOn;
    private Timestamp updatedOn;
}