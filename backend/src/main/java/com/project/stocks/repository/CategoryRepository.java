package com.project.stocks.repository;

import com.project.stocks.dto.Category;
import com.project.stocks.service.DataMapper;
import com.project.stocks.service.File;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CategoryRepository {

    String homeDirectory = System.getProperty("user.home");

    public Category getCategoryDetails(String categoryName) {
        Category category;
        String filePath = homeDirectory + "/stocks/category/" + categoryName;
        String result = File.readFile(filePath);
        DataMapper<Category> dataMapper = DataMapper.getInstance();
        category = dataMapper.map(result, Category.class);
        return category;
    }

    public List<String> getCategoryNames() {
        List<String> categoryNames = new ArrayList<>();
        String filePath = homeDirectory + "/stocks/category/CategoryNames";
        String result = File.readFile(filePath);
        DataMapper<List> dataMapper = DataMapper.getInstance();
        categoryNames.addAll(dataMapper.map(result, List.class));
        return categoryNames;
    }
}
