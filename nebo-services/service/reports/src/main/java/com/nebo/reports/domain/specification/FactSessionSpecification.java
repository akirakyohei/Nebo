package com.nebo.reports.domain.specification;

import com.nebo.reports.applications.model.HistorySessionFilterRequest;
import com.nebo.reports.domain.model.FactSession;
import com.nebo.reports.domain.model.FactSession_;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;

public class FactSessionSpecification {

    public static Specification<FactSession> toFilter(long userKey, HistorySessionFilterRequest request) {
        return (root, cq, cb) -> {
            var predicates = new ArrayList<Predicate>();
            predicates.add(cb.equal(root.get(FactSession_.USER_KEY), userKey));
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
