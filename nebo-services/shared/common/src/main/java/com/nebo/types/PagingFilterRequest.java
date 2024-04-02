package com.nebo.types;


import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public class PagingFilterRequest {

    private int page = 1;
    private int limit = 50;

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        if (page < 1) {
            this.page = 1;
            return;
        }
        this.page = page;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        if (limit < 1) {
            this.limit = 1;
            return;
        }
        if (limit > 250) {
            this.limit = 250;
            return;
        }
        this.limit = limit;
    }

    public Pageable toPageable() {
        return PageRequest.of(page - 1, limit);
    }

    public Pageable toPageable(Sort sort) {
        return PageRequest.of(page - 1, limit, sort);
    }
}
