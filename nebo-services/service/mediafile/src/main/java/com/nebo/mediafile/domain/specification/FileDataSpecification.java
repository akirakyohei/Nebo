package com.nebo.mediafile.domain.specification;

import com.nebo.mediafile.applications.model.FileDataFilterRequest;
import com.nebo.mediafile.domain.model.FileData;
import com.nebo.mediafile.domain.model.FileData_;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;

public class FileDataSpecification {

    public static Specification<FileData> toFilter(long userId, FileDataFilterRequest request) {
        return (root, cq, cb) -> {
            var predicates = new ArrayList<Predicate>();
            predicates.add(cb.equal(root.get(FileData_.USER_ID), userId));
            predicates.add(cb.equal(root.get(FileData_.SYSTEM), false));
            if (request.getQuery() != null) {
                predicates.add(cb.like(root.get(FileData_.FILE_NAME), "%" + request.getQuery() + "%"));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
