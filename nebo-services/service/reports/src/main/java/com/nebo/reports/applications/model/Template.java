package com.nebo.reports.applications.model;

import com.nebo.persistences.ListIntegerConverter;
import com.vladmihalcea.hibernate.type.json.JsonType;
import jakarta.persistence.Convert;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Type;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Map;

@Setter
@Getter
public class Template {
    private long id;
    private long userId;
    private String name;
    private int paperTypeId;
    private List<Integer> categoryIds;
    private Map<String, Object> data;
    private Map<String, Object> params;
    private double size;
    private Instant createdOn;
    private Instant updatedOn;
}
