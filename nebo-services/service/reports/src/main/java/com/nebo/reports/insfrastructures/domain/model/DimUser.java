package com.nebo.reports.insfrastructures.domain.model;

import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@Table(name = "dim_users")
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DimUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userKey;
    private long userId;
    private String firstName;
    private String lastName;
    private String imageUrl;
}
