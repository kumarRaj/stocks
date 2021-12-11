package com.project.stocks.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class CategoryList {

    public CategoryList() {
    }

    @JsonProperty("category")
    private List<String> category;

    public List<String> getCategory() {
        return category;
    }

    public void setCategory(List<String> category) {
        this.category = category;
    }
}
