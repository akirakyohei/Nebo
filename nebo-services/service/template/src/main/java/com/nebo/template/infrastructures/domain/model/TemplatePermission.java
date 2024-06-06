package com.nebo.template.infrastructures.domain.model;

import com.nebo.persistences.ListStringConverter;
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
@Table(name = "template_permissions")
@NoArgsConstructor
@AllArgsConstructor
public class TemplatePermission {
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

    public TemplatePermission(long templateId, long ownerUserId, long sharedUserId) {
        this.templateId = templateId;
        this.ownerUserId = ownerUserId;
        this.sharedUserId = sharedUserId;
    }
}
