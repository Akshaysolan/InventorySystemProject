package com.InventorySystem.controller;


import org.springframework.web.bind.annotation.*;

import com.InventorySystem.model.ProductSale;
import com.InventorySystem.model.SaleReport;
import com.InventorySystem.service.ReportService;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:5173") 
public class ReportController {

 @Autowired
 private ReportService reportService;

 
 @GetMapping("/sales")
 public SaleReport getSalesReport(@RequestParam(defaultValue = "monthly") String timeRange) {
     return reportService.getSalesReport(timeRange);
 }
 
 
 @GetMapping("/inventory")
 public Map<String, Object> getInventoryReport() {
     Map<String, Object> report = new HashMap<>();
     
     report.put("totalProducts", 120); 
     report.put("lowStockItems", 15); 
     report.put("totalCategories", 8); 
     
     List<Map<String, String>> recentActivities = new ArrayList<>();
     recentActivities.add(Map.of("description", "Added new product: iPhone 14", "timestamp", "2025-06-24 09:30"));
     recentActivities.add(Map.of("description", "Updated stock for Samsung Galaxy", "timestamp", "2025-06-23 17:45"));
     
     report.put("recentActivities", recentActivities);
     
     return report;
 }


 @PostMapping("/sales")
 public String addSale(@RequestBody ProductSale productSales) {
     reportService.addSale(productSales);
     return "Sale added successfully";
 }

 @PostMapping("/sales/seed")
 public String seedData() {
     reportService.seedMockData();
     return "50 Sales added successfully.";
 }
}
