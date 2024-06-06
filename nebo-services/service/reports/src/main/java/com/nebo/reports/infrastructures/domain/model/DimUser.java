package com.nebo.reports.infrastructures.domain.model;

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

    public DimUser(long userId, String firstName, String lastName, String imageUrl) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.imageUrl = imageUrl;
    }
}
