package com.nebo.template.interfaces.rest;

import com.nebo.template.applications.model.papertype.PaperTypesResponse;
import com.nebo.template.applications.services.PaperTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/paper_types")
public class PaperTypeController {
    private final PaperTypeService paperTypeService;

    @GetMapping
    public PaperTypesResponse get() {
        return paperTypeService.get();
    }
}
