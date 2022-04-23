package com.project.stocks.service;

import com.project.stocks.repository.ScrapingClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ScrapingService {

    private final ValidatorService validatorService;
    private final ScrapingClient scrapingClient;
    private final StockService stockService;

    @Autowired
    public ScrapingService(ValidatorService validatorService, ScrapingClient scrapingClient,
                           StockService stockService) {
        this.validatorService = validatorService;
        this.scrapingClient = scrapingClient;
        this.stockService = stockService;
    }

    public void add(String stockId) {
        validatorService.validate(stockId);
        if (!stockService.isPresent(stockId)) {
            scrapingClient.add(stockId);
            scrapingClient.addPE(stockId);
        }
    }
}
