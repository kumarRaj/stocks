package com.project.stocks.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class Category {

    @JsonProperty("name")
    private String name;

    @JsonProperty("company")
    private List<String> companies;

    public Category(String name, List<String> companyList) {
        this.name = name;
        this.companies = companyList;
    }

    public Category() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getCompanies() {
        return companies;
    }

    public void setCompanies(List<String> companies) {
        this.companies = companies;
    }
}
