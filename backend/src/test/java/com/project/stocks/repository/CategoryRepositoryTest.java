package com.project.stocks.repository;

import com.project.stocks.dto.Category;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CategoryRepositoryTest {
    @Test
    public void shouldReturnEmptyCategoryIfFileNotPresent(){
        CategoryRepository categoryRepository = new CategoryRepository();
        Category category = categoryRepository.getCategoryDetails("NON_EXISTING_CATEGORY");

        assertEquals("NON_EXISTING_CATEGORY", category.getName());
    }

}