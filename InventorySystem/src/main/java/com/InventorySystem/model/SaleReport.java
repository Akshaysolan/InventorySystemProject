package com.InventorySystem.model;

import java.util.List;

public class SaleReport {
    private double totalSales;
    private int totalOrders;
    private double averageOrderValue;
    private List<ProductSale> topSellingProducts;

    // Getters and setters
    public double getTotalSales() { return totalSales; }
    public void setTotalSales(double totalSales) { this.totalSales = totalSales; }

    public int getTotalOrders() { return totalOrders; }
    public void setTotalOrders(int totalOrders) { this.totalOrders = totalOrders; }

    public double getAverageOrderValue() { return averageOrderValue; }
    public void setAverageOrderValue(double averageOrderValue) { this.averageOrderValue = averageOrderValue; }

    public List<ProductSale> getTopSellingProducts() { return topSellingProducts; }
    public void setTopSellingProducts(List<ProductSale> topSellingProducts) { this.topSellingProducts = topSellingProducts; }
}


