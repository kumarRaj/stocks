package com.project.stocks.service;

import com.project.stocks.repository.ScrapingClient;
import org.junit.jupiter.api.Test;

import static org.mockito.Mockito.*;

class ScrapingServiceTest {

    @Test
    public void addNewStockShouldCallAddAndAddPeWhenStockIsPresent() {
        ScrapingClient scrapingClient = mock(ScrapingClient.class);
        StockService mockStockService = mock(StockService.class);
        String stockId = "INFY";

        when(mockStockService.isPresent(stockId)).thenReturn(false);
        ScrapingService scrapingService = new ScrapingService(scrapingClient, mockStockService);

        scrapingService.addNewStock(stockId);

        verify(scrapingClient).add(stockId);
        verify(scrapingClient).addPE(stockId);
    }

    @Test
    public void addNewStockShouldNotCallAddWhenStockIsPresent() {
        ScrapingClient scrapingClient = mock(ScrapingClient.class);
        StockService mockStockService = mock(StockService.class);
        String stockId = "INFY";

        when(mockStockService.isPresent(stockId)).thenReturn(true);
        ScrapingService scrapingService = new ScrapingService(scrapingClient, mockStockService);

        scrapingService.addNewStock(stockId);

        verify(scrapingClient, times(0)).add(stockId);
        verify(scrapingClient, times(0)).addPE(stockId);
    }
}