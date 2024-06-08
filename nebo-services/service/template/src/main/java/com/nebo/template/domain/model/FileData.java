package com.nebo.template.domain.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Setter
@Getter
@Builder
@Table(name = "file_datas")
@NoArgsConstructor
@AllArgsConstructor
public class FileData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private long userId;
    private String fileName = UUID.randomUUID().toString();
    @Column(name = "`key`")
    private String key;
    private String extension;
    private long size;

    @CreationTimestamp
    private Instant createdAt;

    @UpdateTimestamp
    private  Instant updatedAt;
}
