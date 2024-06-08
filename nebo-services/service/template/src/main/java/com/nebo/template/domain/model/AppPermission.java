package com.nebo.template.domain.model;


import com.nebo.shared.common.persistences.ListIntegerConverter;
import com.nebo.shared.common.persistences.ListLongConverter;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "app_permissions")
@NoArgsConstructor
public class AppPermission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private long userId;
    private long appId;

    @Convert(converter = ListLongConverter.class)

    private List<Long> templateIds;

    @CreationTimestamp
    private Instant createdAt;
    @UpdateTimestamp
    private Instant updatedAt;

    public AppPermission(long userId, long appId) {
        this.userId = userId;
        this.appId = appId;
    }
}
