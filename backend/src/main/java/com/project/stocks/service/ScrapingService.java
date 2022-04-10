package com.project.stocks.service;

import com.project.stocks.repository.ScrappingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class ScrapingService {

    private final ValidatorService validatorService;
    private final ScrappingRepository scrappingRepository;

    @Autowired
    public ScrapingService(ValidatorService validatorService, ScrappingRepository scrappingRepository) {
        this.validatorService = validatorService;
        this.scrappingRepository = scrappingRepository;
    }

    @Async
    public void add(String stockId){
        validatorService.validate(stockId); // TODO: future
        scrappingRepository.add(stockId);
    }
}
