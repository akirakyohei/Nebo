package com.nebo.reports.applications.model;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Setter
@Getter
public class PrintLog {
    private long id;

    private long userId;

    private long templateId;

    private long paperTypeId;

    private Instant createdOn;
}
