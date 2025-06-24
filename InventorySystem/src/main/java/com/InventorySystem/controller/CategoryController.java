package com.InventorySystem.controller;

import com.InventorySystem.DTO.CategoryDTO;
import com.InventorySystem.model.Category;
import com.InventorySystem.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepo;

//
//    @GetMapping
//    public List<Category> getAll() {
//        return categoryRepo.findAll();
//    }
    
    @GetMapping
    public List<CategoryDTO> getAll() {
        return categoryRepo.findAll().stream()
            .map(cat -> new CategoryDTO(cat.getId(),           
             cat.getName(), cat.getDescription()))
            .collect(Collectors.toList());
    }


    @GetMapping("/{id}")
    public Category getById(@PathVariable Long id) {
        return categoryRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with ID: " + id));
    }

  
    @PostMapping
    public Category create(@RequestBody Category category) {
        return categoryRepo.save(category);
    }


    @PutMapping("/{id}")
    public Category update(@PathVariable Long id, @RequestBody Category updatedCategory) {
        Category existing = categoryRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with ID: " + id));

        existing.setName(updatedCategory.getName());
        return categoryRepo.save(existing);
    }

    
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        categoryRepo.deleteById(id);
        return "Category deleted successfully.";
    }
}
