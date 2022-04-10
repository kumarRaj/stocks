package com.project.stocks.repository;

import com.project.stocks.dto.Stock;
import com.project.stocks.service.DataMapper;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

@Component
public class StockRepository {

    String homeDirectory = System.getProperty("user.home");

    public Stock getStockDetails(String stockId) {
        Stock stock = null;
        try {
            String filePath = homeDirectory + "/stocks/data/" + stockId;
            File myObj = new File(filePath);
            Scanner myReader = new Scanner(myObj);

            StringBuilder sb = new StringBuilder();
            while (myReader.hasNextLine()) {
                sb.append(myReader.nextLine());
            }
            String result = sb.toString();
            DataMapper<Stock> dataMapper = DataMapper.getInstance();
            stock = dataMapper.map(result, Stock.class);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        return stock;
    }
}