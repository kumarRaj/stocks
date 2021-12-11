package com.project.stocks.repository;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.project.stocks.dto.Category;
import com.project.stocks.dto.CategoryList;
import com.project.stocks.dto.Stock;
import com.project.stocks.service.DataMapper;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.List;
import java.util.Scanner;

@Component
public class CategoryRepository {

    public Category getCategoryDetails(String categoryName) {
        final AmazonS3 s3 = AmazonS3ClientBuilder.standard().withRegion(Regions.US_EAST_1).build();
        Category category = new Category();
        try {
            String key_name = "category/" + categoryName;
            S3Object o = s3.getObject("stock-ui-bucket", key_name);
            S3ObjectInputStream s3is = o.getObjectContent();
            Scanner s = new Scanner(s3is);
            StringBuilder sb = new StringBuilder();
            while(s.hasNext()){
                sb.append(s.next());
            }
            String result = sb.toString();
            category = DataMapper.mapCategory(result);
            s3is.close();
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return category;
    }

    public CategoryList getCategoryNames() {
        final AmazonS3 s3 = AmazonS3ClientBuilder.standard().withRegion(Regions.US_EAST_1).build();
        CategoryList categoryList = new CategoryList();
        try {
            String key_name = "categoryList";
            S3Object o = s3.getObject("stock-ui-bucket", key_name);
            S3ObjectInputStream s3is = o.getObjectContent();
            Scanner s = new Scanner(s3is);
            StringBuilder sb = new StringBuilder();
            while(s.hasNext()){
                sb.append(s.next());
            }
            String result = sb.toString();
            categoryList = DataMapper.mapCategoryList(result);
            s3is.close();
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return categoryList;
    }
}
