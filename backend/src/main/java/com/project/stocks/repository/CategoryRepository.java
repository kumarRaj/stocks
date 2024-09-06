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

    public static final String USER_HOME = "user.home";
    String homeDirectory = System.getProperty(USER_HOME);
    private final String CATEGORY_NAMES = "/stocks/category/CategoryNames";
    private final String CATEGORY_LIST = "/stocks/category/";

    public Category getCategoryDetails(String categoryName) {

        String filePath = homeDirectory + CATEGORY_LIST + categoryName;
        if (!File.exists(filePath)) {
            return new Category(categoryName, Collections.emptyList());
        }

        String result = File.readFile(filePath);
        DataMapper<Category> dataMapper = DataMapper.getInstance();
        return dataMapper.map(result, Category.class);
    }

    // Todo: Check for file existence before reading
    public List<String> getCategoryNames() {
        String filePath = homeDirectory + CATEGORY_NAMES;
        if (!File.exists(filePath)) {
            return Collections.emptyList();
        }
        String result = File.readFile(filePath);
        DataMapper<List> dataMapper = DataMapper.getInstance();
        return new ArrayList<>(dataMapper.map(result, List.class));
    }
}
