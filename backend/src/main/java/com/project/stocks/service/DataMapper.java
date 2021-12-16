package com.project.stocks.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.project.stocks.dto.Category;
import com.project.stocks.dto.Stock;
import org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return mappedObject;
    }

    private static ObjectMapper getObjectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new Jdk8Module());
        return mapper;
    }


}
