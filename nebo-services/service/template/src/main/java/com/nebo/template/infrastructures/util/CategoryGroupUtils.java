package com.nebo.template.infrastructures.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nebo.shared.web.applications.utils.JsonUtils;
import com.nebo.template.applications.model.category.CategoryGroup;
import org.springframework.util.ResourceUtils;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class CategoryGroupUtils {
    private static final ObjectMapper objectmapper = JsonUtils.createObjectMapper();

    public static List<CategoryGroup> loadData() {
        try {
            var file = ResourceUtils.getFile("classpath:static/category-groups.json");
            var inputStream = new FileInputStream(file);
            objectmapper.readValue(inputStream, objectmapper.getTypeFactory().constructCollectionType(ArrayList.class, CategoryGroup.class));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return List.of();
    }
}
