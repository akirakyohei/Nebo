package com.nebo.template.domain.repository;

import com.nebo.template.domain.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface JpaCategoryRepository extends JpaRepository<Category, Integer>, JpaSpecificationExecutor<Category> {
    List<Category> findAllByUserId(long userId);

    List<Category> findAllByUserIdAndIdIn(long userId, List<Integer> ids);

    Optional<Category> findCategoryByUserIdAndId(long userId, int id);
}
