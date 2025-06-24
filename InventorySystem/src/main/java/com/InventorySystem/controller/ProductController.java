package com.InventorySystem.controller;

import com.InventorySystem.model.Product;
import com.InventorySystem.model.Category;
import com.InventorySystem.repository.CategoryRepository;
import com.InventorySystem.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    @Autowired private ProductService productService;
    @Autowired private CategoryRepository categoryRepo;

    @GetMapping
    public List<Product> getAll() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product get(@PathVariable Long id) {
        return productService.getProduct(id);
    }

    @PostMapping
    public Product create(@RequestBody Product product) {
        if (product.getCategory() == null || product.getCategory().getId() == null) {
            throw new IllegalArgumentException("Category must not be null and must have a valid ID.");
        }

        Category category = categoryRepo.findById(product.getCategory().getId())
                                         .orElseThrow(() -> new IllegalArgumentException("Category not found"));

        product.setCategory(category);
        return productService.saveProduct(product);
    }


    @PutMapping("/{id}")
    public Product update(@PathVariable Long id, @RequestBody Product product) {
        return productService.updateProduct(id, product);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        productService.deleteProduct(id);
    }
}


