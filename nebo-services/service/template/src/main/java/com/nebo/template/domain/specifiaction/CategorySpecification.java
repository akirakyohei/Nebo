package com.nebo.template.domain.specifiaction;

import com.nebo.template.applications.model.category.CategoryFilterRequest;
import com.nebo.template.domain.model.Category;
import com.nebo.template.domain.model.Category_;
import jakarta.persistence.criteria.Predicate;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;

public class CategorySpecification {

    public static Specification<Category> toFilter(long userId, CategoryFilterRequest request) {
        return (root, cq, cb) -> {
            var predicates = new ArrayList<Predicate>();
            predicates.add(cb.equal(root.get(Category_.USER_ID), userId));
            if (StringUtils.isNotBlank(request.getQuery())) {
                predicates.add(cb.like(root.get(Category_.NAME),"%"+ request.getQuery()+"%"));
            }
            if (!CollectionUtils.isEmpty(request.getIds())) {
                predicates.add(root.get(Category_.ID).in(request.getIds()));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
