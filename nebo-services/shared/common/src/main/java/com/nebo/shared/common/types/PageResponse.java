package com.nebo.shared.common.types;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Page;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public abstract class PageResponse<T> {
    private List<T> data;
    private Metadata metadata;

    public PageResponse(Page<T> page){
        this.setData(page.getContent());
        this.setMetadata(new Metadata(page.getNumber() + 1, page.getSize(), page.getTotalElements()));
    }
}
