package com.project.stocks.repository;

import com.project.stocks.dto.Category;
import com.project.stocks.service.DataMapper;
import com.project.stocks.service.File;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Repository
public class CategoryRepository {

    String homeDirectory = System.getProperty("user.home");

    // Todo: Check for file existence before reading
    public Category getCategoryDetails(String categoryName) {
        String filePath = homeDirectory + "/stocks/category/" + categoryName;
        if (!File.exists(filePath)) {
            return new Category(categoryName, Collections.emptyList());
        }

        String result = File.readFile(filePath);
        DataMapper<Category> dataMapper = DataMapper.getInstance();
        return dataMapper.map(result, Category.class);
    }

    // Todo: Check for file existence before reading
    public List<String> getCategoryNames() {
        List<String> categoryNames = new ArrayList<>();
        String filePath = homeDirectory + "/stocks/category/CategoryNames";
        String result = File.readFile(filePath);
        DataMapper<List> dataMapper = DataMapper.getInstance();
        categoryNames.addAll(dataMapper.map(result, List.class));
        return categoryNames;
    }
}
