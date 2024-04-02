package com.nebo.types;

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
public class PageResponse<T> {
    private List<T> data;
    private Metadata metadata;

    public PageResponse(Page<T> page) {
        this.data = page.getContent();
        this.metadata = new Metadata(page.getNumber() + 1, page.getSize(), page.getTotalElements());
    }
}
