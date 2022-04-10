package com.project.stocks.repository;

import com.project.stocks.dto.Stock;
import com.project.stocks.service.DataMapper;
import com.project.stocks.service.File;
import org.springframework.stereotype.Component;

@Component
public class StockRepository {

    String homeDirectory = System.getProperty("user.home");

    public Stock getStockDetails(String stockId) {
        String filePath = homeDirectory + "/stocks/data/" + stockId;
        String result = File.readFile(filePath);
        DataMapper<Stock> dataMapper = DataMapper.getInstance();
        Stock stock = dataMapper.map(result, Stock.class);
        return stock;
    }

    public boolean isPresent(String stockId) {
        String filePath = homeDirectory + "/stocks/data/" + stockId;
        return File.exists(filePath);
    }
}