package com.nebo.mediafile.insfrastructures.domain.repository;

import com.nebo.mediafile.insfrastructures.domain.model.FileData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface JpaFileDataRepository extends JpaRepository<FileData, Long> {

    Optional<FileData> findFileDataByFileName(String fileName);

    Optional<FileData> findFileDataByUserIdAndId(long userId, long id);

    boolean existsByUserIdAndKey(long userId, String key);
}
