package com.nebo.mediafile.insfrastructures.domain.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Setter
@Getter
@Builder
@Table(name = "files")
@NoArgsConstructor
@AllArgsConstructor
public class FileData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private long userId;
    private String fileName = UUID.randomUUID().toString();
    private String key;
    private String extension;
    private long size;
}
