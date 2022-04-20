package com.project.stocks.service;

import com.project.stocks.dto.*;
import com.project.stocks.model.PEDetail;
import com.project.stocks.model.Score;
import com.project.stocks.model.ScoreBreakdown;
import com.project.stocks.repository.StockRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;
import org.mockito.Mockito;

import java.util.ArrayList;

import static org.mockito.Mockito.*;

class StockServiceTest {

    private StockService stockService;

    private StockRepository stockRepository;

    private ScoreBuilder scoreBuilder;

    private ScrapingService scrapingService;

    @BeforeEach
    private void setup() {
        stockRepository = mock(StockRepository.class);
        scoreBuilder = mock(ScoreBuilder.class);
        scrapingService = mock(ScrapingService.class);
        stockService = new StockService(stockRepository, scrapingService);
    }

    @Test
    void allMetricsShouldBeEvaluatedInScoreCalculation() {
        StockSummary stockSummary = getStockSummaryObject();
        Stock stock = stockSummary.getStock();
        ScoreBreakdown scoreBreakdown = new ScoreBreakdown();
        PEDetail peDetail = new PEDetail();
        peDetail.setPe(1);
        Score score = new Score(scoreBreakdown);

        try (MockedStatic<ScoreBuilder> scoreBuilderMock = Mockito.mockStatic(ScoreBuilder.class)){
            scoreBuilderMock.when(ScoreBuilder::getInstance).thenReturn(scoreBuilder);
            when(scrapingService.getPEDetails(stock.getId())).thenReturn(peDetail);
            when(scrapingService.getPeersList(stock.getId())).thenReturn(stockSummary.getPeers());
            when(stockRepository.getStockDetails(stock.getId())).thenReturn(stock);
            when(scoreBuilder.withPE(stockSummary.getPe())).thenReturn(scoreBuilder);
            when(scoreBuilder.withOPM(stock.getOpmDetails().getYearInfo())).thenReturn(scoreBuilder);
            when(scoreBuilder.withNPM(stock.getNpmDetails().getYearInfo())).thenReturn(scoreBuilder);
            when(scoreBuilder.withBorrowings(stock.getDebt().getBorrowingsDetails().getYearInfo())).thenReturn(scoreBuilder);
            when(scoreBuilder.withOtherLiabilities(stock.getDebt().getOtherLiabilitiesDetails().getYearInfo())).thenReturn(scoreBuilder);
            when(scoreBuilder.withRevenue(stock.getDebt().getRevenueDetails().getYearInfo())).thenReturn(scoreBuilder);
            when(scoreBuilder.build()).thenReturn(score);

            stockService.calculateScore(stock.getId());

            verify(scoreBuilder, times(1)).withPE(stockSummary.getPe());
            verify(scoreBuilder, times(1)).withOPM(stock.getOpmDetails().getYearInfo());
            verify(scoreBuilder, times(1)).withNPM(stock.getNpmDetails().getYearInfo());
            verify(scoreBuilder, times(1)).withBorrowings(stock.getDebt().getBorrowingsDetails().getYearInfo());
            verify(scoreBuilder, times(1)).withOtherLiabilities(stock.getDebt().getOtherLiabilitiesDetails().getYearInfo());
            verify(scoreBuilder, times(1)).withRevenue(stock.getDebt().getRevenueDetails().getYearInfo());
        }
    }

    private StockSummary getStockSummaryObject() {
        Stock stock = new Stock();

        YearlyDetail yearlyDetail = new YearlyDetail();

        Debt debt = new Debt();
        debt.setBorrowingsDetails(yearlyDetail);
        debt.setOtherLiabilitiesDetails(yearlyDetail);
        debt.setRevenueDetails(yearlyDetail);

        stock.setId("A");
        stock.setOpmDetails(yearlyDetail);
        stock.setNpmDetails(yearlyDetail);
        stock.setDebt(debt);
        stock.setOpmDetails(yearlyDetail);
        stock.setOpmDetails(yearlyDetail);

        StockSummary stockSummary = new StockSummary(stock.getId(), stock,
                1,2,"IT", new ArrayList<>());

        return stockSummary;
    }
}