package com.InventorySystem.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private double price;
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonBackReference
    private Category category;


    // Getters & Setters
}
