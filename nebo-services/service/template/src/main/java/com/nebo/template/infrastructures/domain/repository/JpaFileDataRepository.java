package com.nebo.template.infrastructures.domain.repository;


import com.nebo.template.infrastructures.domain.model.FileData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface JpaFileDataRepository extends JpaRepository<FileData, Long>, JpaSpecificationExecutor<FileData> {

    List<FileData> findFileDataByUserIdAndIdIn(long userId, List<Long> ids);

}
