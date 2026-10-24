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
    private final String dataDirectory = System.getenv().getOrDefault(
            "STOCKS_DATA_DIR", System.getProperty(USER_HOME) + "/stocks");
    private final String CATEGORY_NAMES = "/category/CategoryNames";
    private final String CATEGORY_LIST = "/category/";

    public Category getCategoryDetails(String categoryName) {

        String filePath = dataDirectory + CATEGORY_LIST + categoryName;
        if (!File.exists(filePath)) {
            return new Category(categoryName, Collections.emptyList());
        }

        String result = File.readFile(filePath);
        DataMapper<Category> dataMapper = DataMapper.getInstance();
        return dataMapper.map(result, Category.class);
    }

    // Todo: Check for file existence before reading
    public List<String> getCategoryNames() {
        String filePath = dataDirectory + CATEGORY_NAMES;
        if (!File.exists(filePath)) {
            return Collections.emptyList();
        }
        String result = File.readFile(filePath);
        DataMapper<List> dataMapper = DataMapper.getInstance();
        return new ArrayList<>(dataMapper.map(result, List.class));
    }
}
