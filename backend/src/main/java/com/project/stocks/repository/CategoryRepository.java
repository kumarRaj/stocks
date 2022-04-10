package com.project.stocks.repository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.project.stocks.dto.Category;
import com.project.stocks.dto.Stock;
import com.project.stocks.service.DataMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

@Component
public class CategoryRepository {

    String homeDirectory = System.getProperty("user.home");

    public Category getCategoryDetails(String categoryName) {
        Category category;
        try {
            String filePath = homeDirectory + "/stocks/category/" + categoryName;
            File myObj = new File(filePath);
            Scanner myReader = new Scanner(myObj);

            StringBuilder sb = new StringBuilder();
            while (myReader.hasNextLine()) {
                sb.append(myReader.nextLine());
            }
            String result = sb.toString();
            DataMapper<Category> dataMapper = DataMapper.getInstance();
            category = dataMapper.map(result, Category.class);
            return category;
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<String> getCategoryNames() {
        List<String> categoryNames = new ArrayList<>();
//        String key_name = "categoryList";
//        String result = s3Repository.getData(bucketName, key_name);
//        DataMapper<List> dataMapper = DataMapper.getInstance();
//        categoryNames.addAll(dataMapper.map(result, List.class));
        return categoryNames;
    }
}
