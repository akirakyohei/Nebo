package com.nebo.template.domain.Specifiaction;

import com.nebo.template.applications.model.template.TemplateUserPermissionFilterRequest;
import com.nebo.template.domain.model.Category_;
import com.nebo.template.domain.model.UserPermission;
import com.nebo.template.domain.model.UserPermission_;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;

public class TemplatePermissionSpecification {

    public static Specification<UserPermission> toFilter(long userId, long templateId, TemplateUserPermissionFilterRequest request) {
        return (root, cq, cb) -> {
            var predicates = new ArrayList<Predicate>();
            predicates.add(cb.equal(root.get(UserPermission_.OWNER_USER_ID), userId));
            if (!CollectionUtils.isEmpty(request.getSharedUserIds())) {
                predicates.add(root.get(UserPermission_.SHARED_USER_ID).in(request.getSharedUserIds()));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
