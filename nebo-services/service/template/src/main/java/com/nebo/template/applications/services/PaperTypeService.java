package com.nebo.template.applications.services;

import com.nebo.template.applications.services.mapper.PaperTypeMapper;
import com.nebo.template.domain.repository.JpaPaperTypeRepository;
import com.nebo.template.applications.model.papertype.PaperTypesResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaperTypeService {
    private final JpaPaperTypeRepository paperTypeRepository;

    private final PaperTypeMapper paperTypeMapper;

    public PaperTypesResponse get() {
        return new PaperTypesResponse(paperTypeRepository.findAll().stream()
                .map(paperTypeMapper::fromDomainToResponse).toList());
    }
}
