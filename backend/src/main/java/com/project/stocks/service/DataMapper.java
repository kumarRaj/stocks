package com.project.stocks.service;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.project.stocks.dto.Category;
import com.project.stocks.dto.CategoryList;
import com.project.stocks.dto.Stock;

public class DataMapper {

    public static Stock mapStock(String result) throws JsonProcessingException {
        if(result == null || result.isEmpty()) return null;
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new Jdk8Module());
        Stock stock = mapper.readValue(result, Stock.class);
        return stock;
    }

    public static Category mapCategory(String result) throws JsonProcessingException {
        if(result == null || result.isEmpty()) return null;
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new Jdk8Module());
        Category category = mapper.readValue(result, Category.class);
        return category;
    }

    public static CategoryList mapCategoryList(String result) throws JsonProcessingException {
        if(result == null || result.isEmpty()) return null;
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new Jdk8Module());
        CategoryList categoryList = mapper.readValue(result, CategoryList.class);
        return categoryList;
    }

}
