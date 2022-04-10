package com.project.stocks.service;

import com.project.stocks.repository.ScrappingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class ScrapingService {

    private final ValidatorService validatorService;
    private final ScrappingRepository scrappingRepository;
    private final StockService stockService;

    @Autowired
    public ScrapingService(ValidatorService validatorService, ScrappingRepository scrappingRepository,
                           StockService stockService) {
        this.validatorService = validatorService;
        this.scrappingRepository = scrappingRepository;
        this.stockService = stockService;
    }

    public void add(String stockId){
        validatorService.validate(stockId);// TODO: future
        if(!stockService.isPresent(stockId)) {
            scrappingRepository.add(stockId);
        }
    }
}
