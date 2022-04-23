package com.project.stocks.service;

import com.project.stocks.repository.ScrapingClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScrapingService {

    private final ScrapingClient scrapingClient;
    private final StockService stockService;

    @Autowired
    public ScrapingService(ScrapingClient scrapingClient,
                           StockService stockService) {
        this.scrapingClient = scrapingClient;
        this.stockService = stockService;
    }

    public void addNewStock(String stockId) {
        if (!stockService.isPresent(stockId)) {
            scrapingClient.add(stockId);
            scrapingClient.addPE(stockId);
        }
    }
}
