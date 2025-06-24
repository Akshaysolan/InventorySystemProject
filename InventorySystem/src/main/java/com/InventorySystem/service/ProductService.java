package com.InventorySystem.service;

import com.InventorySystem.model.Product;
import com.InventorySystem.model.Category;
import com.InventorySystem.repository.ProductRepository;
import com.InventorySystem.repository.CategoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired private ProductRepository productRepo;
    @Autowired private CategoryRepository categoryRepo;

    public List<Product> getAllProducts() {
        return productRepo.findAll();
    }

    public Product getProduct(Long id) {
        return productRepo.findById(id).orElse(null);
    }

    public Product saveProduct(Product product) {
        return productRepo.save(product);
    }

    public Product updateProduct(Long id, Product updatedProduct) {
        Product existing = productRepo.findById(id).orElse(null);
        if (existing != null) {
            existing.setName(updatedProduct.getName());
            existing.setDescription(updatedProduct.getDescription());
            existing.setPrice(updatedProduct.getPrice());
            existing.setQuantity(updatedProduct.getQuantity());

            if (updatedProduct.getCategory() != null) {
                Category category = categoryRepo.findById(updatedProduct.getCategory().getId()).orElse(null);
                existing.setCategory(category);
            }

            return productRepo.save(existing);
        }
        return null;
    }

    public void deleteProduct(Long id) {
        productRepo.deleteById(id);
    }
}
