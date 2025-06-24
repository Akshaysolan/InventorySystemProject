package com.InventorySystem.DTO;

import lombok.AllArgsConstructor;
import lombok.*;

@AllArgsConstructor
@Getter
@Setter
public class CategoryDTO {
    private Long id;
    private String name;
    private String description; // optional

    public CategoryDTO(Long id, String name) {
        this.id = id;
        this.name = name;
    }
    public CategoryDTO() {
    }
    // constructor, getters, setters
}
