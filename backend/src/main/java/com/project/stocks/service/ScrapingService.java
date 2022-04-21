package com.project.stocks.service;

import com.project.stocks.dto.Peer;
import com.project.stocks.model.PEDetail;
import com.project.stocks.repository.ScrapingClient;
import com.project.stocks.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScrapingService {

    private final ValidatorService validatorService;
    private final ScrapingClient scrapingClient;
    private final StockRepository stockRepository;

    @Autowired
    public ScrapingService(ValidatorService validatorService, ScrapingClient scrapingClient,
                           StockRepository stockRepository) {
        this.validatorService = validatorService;
        this.scrapingClient = scrapingClient;
        this.stockRepository = stockRepository;
    }

    public void add(String stockId){
        validatorService.validate(stockId);
        scrapingClient.add(stockId);
        scrapingClient.addPE(stockId);
        scrapingClient.addPeers(stockId);
    }
}
