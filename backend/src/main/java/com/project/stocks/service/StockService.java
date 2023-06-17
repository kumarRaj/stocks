package com.project.stocks.service;

import com.project.stocks.dto.Stock;
import com.project.stocks.model.Score;
import com.project.stocks.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

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
        score.setStockId(stockId);
        return score;
    }

    private Score calculateStockMetrics(Stock stock) {
        ScoreBuilder scoreBuilder = ScoreBuilder.getInstance();
        scoreBuilder.withPE(stock.getPe().getValue())
                .withDate(stock.getLastUpdatedAt())
                .withOPM(stock.getOpmDetails().getYearInfo())
                .withNPM(stock.getNpmDetails().getYearInfo())
                .withRevenue(stock.getDebt().getReserves().getYearInfo())
                .withOtherLiabilities(stock.getDebt().getOtherLiabilitiesDetails().getYearInfo())
                .withBorrowings(stock.getDebt().getBorrowingsDetails().getYearInfo());
        return scoreBuilder.build();
    }

    public boolean isPresent(String stockId) {
        return stockRepository.isPresent(stockId);
    }

    public List<Score> calculateScoreOfAllCompanies() {
        List<Score> stockScores = new ArrayList<>();
        List<String> stockIds = stockRepository.getAllStockNames();

        for (String stockId : stockIds){
            try {
                stockScores.add(calculateScore(stockId));
            } catch (Exception e){
                System.out.println("Error in calculating score for " + stockId + "\n" + e.getMessage());
                stockScores.add(new Score(stockId));
            }
        }

        Collections.sort(stockScores, (a, b) -> b.getScore() - a.getScore());
        return stockScores;
    }
}
