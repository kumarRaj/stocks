package com.project.stocks.controller;

import com.project.stocks.dto.StockRequest;
import com.project.stocks.service.ScrapingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ScrapingController {
    private final ScrapingService scrapingService;

    @Autowired
    public ScrapingController(ScrapingService scrapingService) {
        this.scrapingService = scrapingService;
    }

    @PostMapping(value = "/stock")
    public void create(@RequestBody StockRequest stockRequest){
        scrapingService.addNewStock(stockRequest.stockId);
    }
}
