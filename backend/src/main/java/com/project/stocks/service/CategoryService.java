package com.project.stocks.service;

import com.project.stocks.dto.Category;
import com.project.stocks.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    private CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public Category getCategoryDetails(String category){
        return categoryRepository.getCategoryDetails(category);
    }
}
