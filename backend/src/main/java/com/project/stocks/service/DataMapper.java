package com.project.stocks.service;

import tools.jackson.core.JacksonException;
import tools.jackson.databind.DeserializationFeature;
import tools.jackson.databind.ObjectMapper;

public class DataMapper<T> {

    private static DataMapper dataMapper = null;

    private DataMapper() {
    }

    public static DataMapper getInstance() {
        if(dataMapper == null)
            dataMapper = new DataMapper();
        return dataMapper;
    }

    public T map(String result, Class<T> classObject) {
        if(result == null || result.isEmpty()) return null;
        T mappedObject = null;
        try {
            mappedObject = getObjectMapper().readValue(result, classObject);
        } catch (JacksonException e) {
            e.printStackTrace();
        }
        return mappedObject;
    }

    private static ObjectMapper getObjectMapper() {
        return new ObjectMapper().rebuild()
                .disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES)
                .build();
    }


}
