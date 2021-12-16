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
            category = DataMapper.mapCategory(result);
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
            categoryNames.addAll(DataMapper.mapCategoryList(result));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return categoryNames;
    }
}
