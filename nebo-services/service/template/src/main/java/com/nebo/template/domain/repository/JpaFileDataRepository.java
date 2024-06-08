package com.nebo.template.domain.repository;


import com.nebo.template.domain.model.FileData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface JpaFileDataRepository extends JpaRepository<FileData, Long>, JpaSpecificationExecutor<FileData> {

    List<FileData> findFileDataByUserIdAndIdIn(long userId, List<Long> ids);

}
