package com.nebo.template.infrastructures.domain.Specifiaction;

import com.nebo.template.applications.model.category.CategoryFilterRequest;
import com.nebo.template.applications.model.template.TemplateFilterRequest;
import com.nebo.template.infrastructures.domain.model.Category;
import com.nebo.template.infrastructures.domain.model.Category_;
import com.nebo.template.infrastructures.domain.model.Template;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;

public class TemplateSpecification {

    public static Specification<Template> toFilter(long userId, TemplateFilterRequest request) {
        return (root, cq, cb) -> {
            var predicates = new ArrayList<Predicate>();
            predicates.add(cb.equal(root.get(Category_.USER_ID), userId));
            if (request.getQuery() != null) {
                predicates.add(cb.like(root.get(Category_.NAME), request.getQuery()));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
