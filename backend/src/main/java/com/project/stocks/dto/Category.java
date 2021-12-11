package com.project.stocks.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class Category {

    @JsonProperty("name")
    private String name;

    @JsonProperty("company")
    private List<String> companyList;

    public Category(String name, List<String> companyList) {
        this.name = name;
        this.companyList = companyList;
    }

    public Category() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getCompanyList() {
        return companyList;
    }

    public void setCompanyList(List<String> companyList) {
        this.companyList = companyList;
    }
}
