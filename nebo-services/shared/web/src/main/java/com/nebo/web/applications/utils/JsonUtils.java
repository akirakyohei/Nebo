package com.nebo.web.applications.utils;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.datatype.jsr310.JSR310Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import java.io.IOException;
import java.io.StringWriter;
import java.util.List;
import java.util.Map;


public class JsonUtils {

    public static final ObjectMapper OBJECT_MAPPER = createObjectMapper();

    public static ObjectMapper createObjectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
        objectMapper.configure(DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT, true);
        objectMapper.configure(DeserializationFeature.USE_BIG_DECIMAL_FOR_FLOATS, true);
        objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        objectMapper.setPropertyNamingStrategy(PropertyNamingStrategy.CAMEL_CASE_TO_LOWER_CASE_WITH_UNDERSCORES);
        objectMapper.configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, false);
        objectMapper.registerModule(new JavaTimeModule());
        return objectMapper;
    }


    public static String unmarshall(Object o) {
        StringWriter sw = new StringWriter();
        JsonGenerator gen = null;
        try {
            gen = new JsonFactory().createGenerator(sw);
            OBJECT_MAPPER.writeValue(gen, o);
        } catch (IOException e) {
            throw new RuntimeException("Cannot serialize object to Json", e);
        } finally {
            if (null != gen) {
                try {
                    gen.close();
                } catch (IOException e) {
                    throw new RuntimeException("Cannot serialize object to Json", e);
                }
            }
        }
        return sw.toString();
    }

    public static Map<String, Object> marshallToMap(Object o) {
        return OBJECT_MAPPER.convertValue(o, Map.class);
    }

    public static <T> T marshall(String json, Class<T> clazz) {
        try {
            return OBJECT_MAPPER.readValue(json, clazz);
        } catch (IOException e) {
            throw new RuntimeException("Exception when converting Json to object, the data is:" + json, e);
        }
    }


    public static <T> List<T> marshallToArray(String json, Class<T> clazz) throws IOException {
        JavaType type = OBJECT_MAPPER.getTypeFactory().constructCollectionType(List.class, clazz);
        return OBJECT_MAPPER.readValue(json, type);
    }


    public static <T> T marshall(JsonNode jsonNode, Class<T> clazz) {
        try {
            T t = OBJECT_MAPPER.treeToValue(jsonNode, clazz);
            return t;
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Exception when converting Json to object, the data is:" + jsonNode.toString(), e);
        }
    }

    public static JsonNode marshallToNode(Object o) {
        try {
            if (o == null) {
                return OBJECT_MAPPER.createObjectNode();
            } else {
                return OBJECT_MAPPER.convertValue(o, JsonNode.class);
            }
        } catch (Exception e) {
            throw new RuntimeException("Cannot serialize object to Json", e);
        }
    }


    public static <T> T marshall(String json, TypeReference<T> tr) {
        if (json == null || "".equals(json)) {
            throw new RuntimeException("Exception when converting Json to object, the data is:" + json);
        } else {
            try {
                return (T) OBJECT_MAPPER.readValue(json, tr);
            } catch (Exception e) {
                throw new RuntimeException("Exception when converting Json to object, the data is:" + json, e);
            }
        }
    }

}