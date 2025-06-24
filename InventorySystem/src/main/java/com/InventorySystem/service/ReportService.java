package com.InventorySystem.service;

import com.InventorySystem.model.ProductSale;
import com.InventorySystem.model.SaleReport;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Random;

@Service
public class ReportService {

    public SaleReport getSalesReport(String timeRange) {
        Random random = new Random();
        List<ProductSale> products = new ArrayList<>();

        // Generate 50 mock products with random sales
        for (int i = 1; i <= 50; i++) {
            int qty = random.nextInt(50) + 1; // quantity: 1 to 50
            double price = 10 + (random.nextDouble() * 100); // price: 10 to 110
            double revenue = qty * price;

            products.add(new ProductSale("Product " + i, qty, revenue));
        }

        // Sort by totalRevenue descending and get top 10
        products.sort(Comparator.comparingDouble(ProductSale::getTotalRevenue).reversed());
        List<ProductSale> topSelling = products.subList(0, Math.min(10, products.size()));

        // Summary stats
        double totalSales = products.stream().mapToDouble(ProductSale::getTotalRevenue).sum();
        int totalOrders = products.stream().mapToInt(ProductSale::getQuantitySold).sum();
        double averageOrderValue = totalOrders == 0 ? 0 : totalSales / totalOrders;

        // Prepare report
        SaleReport report = new SaleReport();
        report.setTotalSales(totalSales);
        report.setTotalOrders(totalOrders);
        report.setAverageOrderValue(averageOrderValue);
        report.setTopSellingProducts(topSelling);

        return report;
    }
    
    private final List<ProductSale> salesData = new ArrayList<>();

    public void addSale(ProductSale sale) {
        salesData.add(sale);
    }
    
    public void seedMockData() {
        for (int i = 1; i <= 50; i++) {
            String name = "Product " + i;
            int qty = new Random().nextInt(100) + 1;
            double price = 10 + new Random().nextDouble() * 100;
            addSale(new ProductSale(name, qty, qty * price));
        }
    }
}
