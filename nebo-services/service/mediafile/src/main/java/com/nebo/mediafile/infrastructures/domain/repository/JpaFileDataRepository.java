package com.nebo.mediafile.infrastructures.domain.repository;

import com.nebo.mediafile.infrastructures.domain.model.FileData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface JpaFileDataRepository extends JpaRepository<FileData, Long>, JpaSpecificationExecutor<FileData> {

    Optional<FileData> findFileDataByFileName(String fileName);

    Optional<FileData> findFileDataByUserIdAndId(long userId, long id);

    List<FileData> findFileDataByUserIdAndIdIn(long userId, List<Long> ids);

    Optional<FileData> findFileDataByUserIdAndKey(long userId, String key);

    boolean existsByUserIdAndKey(long userId, String key);
}
