package com.project.stocks.service;

import com.project.stocks.dto.*;
import com.project.stocks.model.Score;
import com.project.stocks.repository.StockRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockedStatic;
import org.mockito.Mockito;

import static org.mockito.Mockito.*;

class StockServiceTest {

    private StockService stockService;

    private StockRepository stockRepository;

    private ScoreBuilder scoreBuilder;

    @BeforeEach
    private void setup() {
        stockRepository = mock(StockRepository.class);
        scoreBuilder = mock(ScoreBuilder.class);
        stockService = new StockService(stockRepository);
    }

    @Test
    void allMetricsShouldBeEvaluatedInScoreCalculation() {
        Stock stock = getStockObject();
        Score score = new Score();

        try (MockedStatic<ScoreBuilder> scoreBuilderMock = Mockito.mockStatic(ScoreBuilder.class)){
            scoreBuilderMock.when(ScoreBuilder::getInstance).thenReturn(scoreBuilder);
            when(stockRepository.getStockDetails(stock.getId())).thenReturn(stock);
            when(scoreBuilder.withPE(stock.getPe().getValue())).thenReturn(scoreBuilder);
            when(scoreBuilder.withOPM(stock.getOpmDetails().getYearInfo())).thenReturn(scoreBuilder);
            when(scoreBuilder.withNPM(stock.getNpmDetails().getYearInfo())).thenReturn(scoreBuilder);
            when(scoreBuilder.withBorrowings(stock.getDebt().getBorrowingsDetails().getYearInfo())).thenReturn(scoreBuilder);
            when(scoreBuilder.withOtherLiabilities(stock.getDebt().getOtherLiabilitiesDetails().getYearInfo())).thenReturn(scoreBuilder);
            when(scoreBuilder.withRevenue(stock.getDebt().getRevenueDetails().getYearInfo())).thenReturn(scoreBuilder);
            when(scoreBuilder.build()).thenReturn(score);

            stockService.calculateScore(stock.getId());

            verify(scoreBuilder, times(1)).withPE(stock.getPe().getValue());
            verify(scoreBuilder, times(1)).withOPM(stock.getOpmDetails().getYearInfo());
            verify(scoreBuilder, times(1)).withNPM(stock.getNpmDetails().getYearInfo());
            verify(scoreBuilder, times(1)).withBorrowings(stock.getDebt().getBorrowingsDetails().getYearInfo());
            verify(scoreBuilder, times(1)).withOtherLiabilities(stock.getDebt().getOtherLiabilitiesDetails().getYearInfo());
            verify(scoreBuilder, times(1)).withRevenue(stock.getDebt().getRevenueDetails().getYearInfo());
        }
    }

    private Stock getStockObject() {
        Stock stock = new Stock();

        YearlyDetail yearlyDetail = new YearlyDetail();

        StockMetric stockMetric = new StockMetric(Unit.Blank, 0);

        Debt debt = new Debt();
        debt.setBorrowingsDetails(yearlyDetail);
        debt.setOtherLiabilitiesDetails(yearlyDetail);
        debt.setRevenueDetails(yearlyDetail);

        stock.setId("A");
        stock.setPe(stockMetric);
        stock.setOpmDetails(yearlyDetail);
        stock.setNpmDetails(yearlyDetail);
        stock.setDebt(debt);
        stock.setOpmDetails(yearlyDetail);
        stock.setOpmDetails(yearlyDetail);

        return stock;
    }
}