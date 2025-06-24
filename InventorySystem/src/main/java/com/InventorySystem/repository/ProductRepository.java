package com.InventorySystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.InventorySystem.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
