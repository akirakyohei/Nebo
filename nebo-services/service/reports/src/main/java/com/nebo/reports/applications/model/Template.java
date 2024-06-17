package com.nebo.reports.applications.model;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.commons.lang3.StringUtils;

import java.io.IOException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Setter
@Getter
@NoArgsConstructor
public class Template {
    private long id;
    private long userId;
    private String name;
    private int paperTypeId;

    @JsonDeserialize(using = ListStringDeserialize.class)
    private List<Integer> categoryIds;
    private long size;
    private Instant createdAt;
    private Instant updatedAt;

    public static class ListStringDeserialize extends JsonDeserializer<List<Integer>> {

        public ListStringDeserialize() {
        }

        @Override
        public List<Integer> deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JacksonException {
            if (p == null)
                return null;
            return new ArrayList<Integer>(Arrays.stream(StringUtils.split(p.getValueAsString(), ","))
                    .mapToInt(Integer::parseInt)
                    .boxed().toList());
        }
    }
}
