package com.project.stocks.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.project.stocks.dto.Category;
import com.project.stocks.dto.Stock;

import java.util.ArrayList;
import java.util.List;

public class DataMapper<T> {

    public T map(String result, Class<T> classObject) throws JsonProcessingException {
        if(result == null || result.isEmpty()) return null;
        T mappedObject = (T) getObjectMapper().readValue(result, classObject);
        return mappedObject;
    }

    private static ObjectMapper getObjectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new Jdk8Module());
        return mapper;
    }
}
