package com.project.stocks.controller;

import com.project.stocks.dto.Category;
import com.project.stocks.service.CategoryService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/stock/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @ApiOperation(value = "Fetch companies present in a category")
    @GetMapping(value = "/{category}")
    public Category getCategoryDetails(@PathVariable(value = "category") String category){
        return categoryService.getCategoryDetails(category);
    }

    @ApiOperation(value = "Fetch category names")
    @GetMapping
    public List<String> getCategoryNames(){
        return categoryService.getCategoryNames();
    }

    @ApiOperation(value = "Load company details present in the category")
    @PostMapping(value = "/{category}")
    public void loadAllCompanyDataInACategory(@PathVariable(value = "category") String category){
        categoryService.loadAllCompanyDataInACategory(category);
    }

    @ApiOperation(value = "Load company details present in all categories")
    @PostMapping(value = "/loadData")
    @Async
    public void loadAllCompanyDataForAllCategory(){
        categoryService.loadAllCompanyDataForAllCategory();
    }

}
