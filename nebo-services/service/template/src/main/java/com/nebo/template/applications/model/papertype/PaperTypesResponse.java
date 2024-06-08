package com.nebo.template.applications.model.papertype;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PaperTypesResponse {
    private List<PaperTypeResponse> paperTypes;
}
