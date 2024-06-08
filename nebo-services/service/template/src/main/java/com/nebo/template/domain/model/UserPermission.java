package com.nebo.template.domain.model;

import com.nebo.shared.common.persistences.ListStringConverter;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
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
@Table(name = "user_permissions")
@NoArgsConstructor
@AllArgsConstructor
public class UserPermission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long templateId;
    private long ownerUserId;
    private long sharedUserId;
    @Convert(converter = ListStringConverter.class)
    private List<String> permissions;

    @CreationTimestamp
    private Instant createdAt;

    @UpdateTimestamp
    private Instant updatedAt;

    public UserPermission(long templateId, long ownerUserId, long sharedUserId) {
        this.templateId = templateId;
        this.ownerUserId = ownerUserId;
        this.sharedUserId = sharedUserId;
    }
}
