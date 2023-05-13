package com.project.stocks.controller;

import com.project.stocks.dto.StockRequest;
import com.project.stocks.service.ScrapingService;
import io.swagger.annotations.ApiOperation;
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

    @ApiOperation(value = "Load stock details of given stockID")
    @PostMapping(value = "/stock")
    public void create(@RequestBody StockRequest stockRequest){
        scrapingService.addNewStock(stockRequest.stockId);
    }
}
