package com.InventorySystem.model;

public class ProductSale {
    private String name;
    private int quantitySold;
    private double totalRevenue;

    public ProductSale() {}

    public ProductSale(String name, int quantitySold, double totalRevenue) {
        this.name = name;
        this.quantitySold = quantitySold;
        this.totalRevenue = totalRevenue;
    }

    // Getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getQuantitySold() { return quantitySold; }
    public void setQuantitySold(int quantitySold) { this.quantitySold = quantitySold; }

    public double getTotalRevenue() { return totalRevenue; }
    public void setTotalRevenue(double totalRevenue) { this.totalRevenue = totalRevenue; }
}
