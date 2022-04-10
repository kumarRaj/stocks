package com.project.stocks.service;

import com.project.stocks.dto.Stock;
import com.project.stocks.model.Score;
import com.project.stocks.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StockService {

    private StockRepository stockRepository;

    @Autowired
    public StockService(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    public Stock getStockDetails(String stockId) {
        return stockRepository.getStockDetails(stockId);
    }

    public Score calculateScore(String stockId) {
        Stock stock = getStockDetails(stockId);
        Score score = calculateStockMetrics(stock);
        return score;
    }

    private Score calculateStockMetrics(Stock stock) {
        ScoreBuilder scoreBuilder = ScoreBuilder.getInstance();
        scoreBuilder.withPE(stock.getPe().getValue())
                .withOPM(stock.getOpmDetails().getYearInfo())
                .withNPM(stock.getNpmDetails().getYearInfo())
                .withRevenue(stock.getDebt().getRevenueDetails().getYearInfo())
                .withOtherLiabilities(stock.getDebt().getOtherLiabilitiesDetails().getYearInfo())
                .withBorrowings(stock.getDebt().getBorrowingsDetails().getYearInfo());
        return scoreBuilder.build();
    }

    public boolean isPresent(String stockId) {
        return stockRepository.isPresent(stockId);
    }
}
