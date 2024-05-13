package com.nebo.sso.infrastructures.domain.specifiation;

import com.nebo.sso.applications.model.UserFilterRequest;
import com.nebo.sso.infrastructures.domain.model.User;
import com.nebo.sso.infrastructures.domain.model.User_;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;

public class UserSpecification {
    public static Specification<User> toFilter(UserFilterRequest request) {
        return (root, cq, cb) -> {
            var predicates = new ArrayList<Predicate>();
            if (request.getQuery() != null)
                predicates.add(cb.like(root.get(User_.ID), "%" + request.getQuery() + "%"));
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
