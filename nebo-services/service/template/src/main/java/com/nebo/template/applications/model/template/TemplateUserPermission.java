package com.nebo.template.applications.model.template;

import com.nebo.shared.common.persistences.ListStringConverter;
import jakarta.persistence.Convert;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;
import java.util.List;

@Setter
@Getter
public class TemplateUserPermission {
    private long id;
    private long templateId;
    private long ownerUserId;
    private long sharedUserId;
    private List<String> permissions;
    private Instant createdAt;
    private Instant updatedAt;
}
