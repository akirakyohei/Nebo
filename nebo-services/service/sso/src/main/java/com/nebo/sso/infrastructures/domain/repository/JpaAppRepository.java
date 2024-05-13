package com.nebo.sso.infrastructures.domain.repository;

import com.nebo.sso.infrastructures.domain.model.App;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaAppRepository extends JpaRepository<App, String> {
}
