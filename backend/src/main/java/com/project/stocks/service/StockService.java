package com.project.stocks.service;

import com.project.stocks.dto.Peer;
import com.project.stocks.dto.Stock;
import com.project.stocks.dto.StockSummary;
import com.project.stocks.model.PEDetail;
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
    private ScrapingService scrapingService;

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
        scoreBuilder
//                .withPE(stock.getPe().getValue())
                .withOPM(stock.getOpmDetails().getYearInfo())
                .withNPM(stock.getNpmDetails().getYearInfo())
                .withRevenue(stock.getDebt().getRevenueDetails().getYearInfo())
                .withOtherLiabilities(stock.getDebt().getOtherLiabilitiesDetails().getYearInfo())
                .withBorrowings(stock.getDebt().getBorrowingsDetails().getYearInfo());
        return scoreBuilder.build();
    }

    private Score calculateStockMetrics(StockSummary stockSummary) {
        Stock stock = stockSummary.getStock();
        ScoreBuilder scoreBuilder = ScoreBuilder.getInstance();
        scoreBuilder
                .withPE(stockSummary.getPe())
                .withOPM(stock.getOpmDetails().getYearInfo())
                .withNPM(stock.getNpmDetails().getYearInfo())
                .withRevenue(stock.getDebt().getRevenueDetails().getYearInfo())
                .withOtherLiabilities(stock.getDebt().getOtherLiabilitiesDetails().getYearInfo())
                .withBorrowings(stock.getDebt().getBorrowingsDetails().getYearInfo());
        return scoreBuilder.build();
    }

    public List<Score> calculateScoreOfAllCompanies() {
        List<Score> stockScores = new ArrayList<>();
        List<String> stockIds = stockRepository.getAllStockNames();

        for (String stockId : stockIds) {
            stockScores.add(calculateScore(stockId));
        }

        Collections.sort(stockScores, (a, b) -> b.getScore() - a.getScore());
        return stockScores;
    }

    public StockSummary getStockSummary(String stockId) {
        PEDetail peDetail = scrapingService.getPEDetails(stockId);
        Stock stockDetail = getStockDetails(stockId);
        List<Peer> peersList = scrapingService.getPeersList(stockId);
        StockSummary stockSummary = new StockSummary(stockId, stockDetail, peDetail.getPe(), peDetail.getSectorPE(),
                peDetail.getSector(), peersList);

        Score score = calculateStockMetrics(stockSummary);
        score.setStockId(stockId);

        stockSummary.setScore(score);

        return stockSummary;
    }
}
