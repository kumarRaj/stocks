package com.project.stocks.repository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.project.stocks.dto.Category;
import com.project.stocks.service.DataMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CategoryRepository {

    private final String bucketName = "stock-ui-bucket";

    private S3Repository s3Repository;

    @Autowired
    public CategoryRepository(S3Repository s3Repository) {
        this.s3Repository = s3Repository;
    }

    public Category getCategoryDetails(String categoryName) {
        Category category = new Category();
        try {
            String key_name = "category/" + categoryName;
            String result = s3Repository.getData(bucketName, key_name);
            DataMapper<Category> dataMapper = new DataMapper<>();
            category = dataMapper.map(result, Category.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return category;
    }

    public List<String> getCategoryNames() {
        List<String> categoryNames = new ArrayList<>();
        try {
            String key_name = "categoryList";
            String result = s3Repository.getData(bucketName, key_name);
            DataMapper<List> dataMapper = new DataMapper<>();
            categoryNames.addAll(dataMapper.map(result, List.class));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return categoryNames;
    }
}
