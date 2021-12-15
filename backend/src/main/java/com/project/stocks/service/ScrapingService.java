package com.project.stocks.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class ScrapingService {
    private final ValidatorService validatorService;
    private final LambdaService lambdaService;

    @Autowired
    public ScrapingService(ValidatorService validatorService, LambdaService lambdaService) {
        this.validatorService = validatorService;
        this.lambdaService = lambdaService;
    }
    
    @Async
    public void add(String stockId){
        validatorService.validate(stockId); // TODO: future
        lambdaService.generateStockInformation(stockId);
    }
}
