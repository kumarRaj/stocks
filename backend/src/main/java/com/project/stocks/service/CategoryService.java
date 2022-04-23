package com.project.stocks.service;

import com.project.stocks.dto.Category;
import com.project.stocks.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private CategoryRepository categoryRepository;

    private ScrapingService scrapingService;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository, ScrapingService scrapingService) {
        this.categoryRepository = categoryRepository;
        this.scrapingService = scrapingService;
    }

    public Category getCategoryDetails(String category) {
        return categoryRepository.getCategoryDetails(category);
    }

    public List<String> getCategoryNames() {
        return categoryRepository.getCategoryNames();
    }

    public void loadAllCompanyDataInACategory(String category) {
        Category data = getCategoryDetails(category);
        List<String> companies = data.getCompanies();
        companies.stream().forEach((company) -> scrapingService.addNewStock(company));
    }

    public void loadAllCompanyDataForAllCategory() {
        List<String> categoryNames = getCategoryNames();
        categoryNames.stream().forEach((categoryName) -> loadAllCompanyDataInACategory(categoryName));
    }
}
