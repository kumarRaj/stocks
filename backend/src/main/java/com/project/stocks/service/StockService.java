package com.project.stocks.service;

import com.project.stocks.dto.Peer;
import com.project.stocks.dto.Stock;
import com.project.stocks.dto.StockSummary;
import com.project.stocks.model.PEDetail;
import com.project.stocks.model.Score;
import com.project.stocks.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
public class StockService {

    private StockRepository stockRepository;

    private ScrapingService scrapingService;

    @Autowired
    public StockService(StockRepository stockRepository, ScrapingService scrapingService) {
        this.stockRepository = stockRepository;
        this.scrapingService = scrapingService;
    }

    public Score calculateScore(String stockId) {
        StockSummary stockSummary = getStockSummary(stockId);
        Score score = stockSummary.getScore();
        return score;
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
        List<String> stockIds = new ArrayList<>();
        stockIds.addAll(stockRepository.getAllStockDetailsNames());
        stockIds.addAll(stockRepository.getAllPEStockNames());
        Set<String> temp = new HashSet<>();
        Set<String> duplicateValues = stockIds.stream().filter(n -> !temp.add(n)).collect(Collectors.toSet());

        for (String stockId : duplicateValues) {
            stockScores.add(calculateScore(stockId));
        }

        Collections.sort(stockScores, (a, b) -> b.getScore() - a.getScore());
        return stockScores;
    }

    public StockSummary getStockSummary(String stockId) {
        Optional<PEDetail> peDetail = stockRepository.getPEDetails(stockId);
        Optional<Stock> stockDetail = stockRepository.getStockDetails(stockId);
        List<Peer> peersList = stockRepository.getPeersList(stockId);

        if(peDetail.isPresent() && stockDetail.isPresent()) {
            StockSummary stockSummary = new StockSummary(stockId, stockDetail.get(), peDetail.get().getPe(), peDetail.get().getSectorPE(),
                    peDetail.get().getSector(), peersList);

            Score score = calculateStockMetrics(stockSummary);
            score.setStockId(stockId);
            stockSummary.setScore(score);

            return stockSummary;
        }
        return null;
    }
}
