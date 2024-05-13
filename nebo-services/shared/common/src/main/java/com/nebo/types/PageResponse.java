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

    public static <K, T extends PageResponse<K>> T build(Page<K> page) {
        var response = new PageResponse<K>();
        response.setData(page.getContent());
        response.setMetadata(new Metadata(page.getNumber() + 1, page.getSize(), page.getTotalElements()));
        return (T) response;
    }
}
