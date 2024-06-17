package com.nebo.reports.applications.model;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Setter
@Getter
@Builder
@JsonRootName("used_paper_types")
public class UsedPaperTypesResponse {
    List<UsedPaperTypeResponse> data;
    private long totalElement;
    private long aggregates;

}
