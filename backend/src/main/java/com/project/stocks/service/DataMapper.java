package com.project.stocks.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.project.stocks.dto.Category;
import com.project.stocks.dto.Stock;

import java.util.ArrayList;
import java.util.List;

public class DataMapper {

    public static Stock mapStock(String result) throws JsonProcessingException {
        if(result == null || result.isEmpty()) return null;
        Stock stock = getObjectMapper().readValue(result, Stock.class);
        return stock;
    }

    public static Category mapCategory(String result) throws JsonProcessingException {
        if(result == null || result.isEmpty()) return null;
        Category category = getObjectMapper().readValue(result, Category.class);
        return category;
    }

    private static ObjectMapper getObjectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new Jdk8Module());
        return mapper;
    }

    public static List<String> mapCategoryList(String result) throws JsonProcessingException {
        if(result == null || result.isEmpty()) return null;
        List<String> categoryNames = new ArrayList<>();
        categoryNames.addAll(getObjectMapper().readValue(result, List.class));
        return categoryNames;
    }

}
