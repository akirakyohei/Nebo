package com.nebo.template.infrastructures.domain.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;

@Setter
@Getter
@Table(name = "print_logs")
@Entity
public class PrintLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private long userId;

    private long templateId;

    private long paperTypeId;

    @CreationTimestamp
    private Instant createdOn;
}
