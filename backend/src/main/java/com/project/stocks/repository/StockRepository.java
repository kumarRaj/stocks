package com.project.stocks.repository;

import com.project.stocks.dto.Stock;
import com.project.stocks.model.PeDetail;
import com.project.stocks.service.DataMapper;
import com.project.stocks.service.File;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class StockRepository {

    String homeDirectory = System.getProperty("user.home");

    public Stock getStockDetails(String stockId) {
        String filePath = homeDirectory + "/stocks/data/" + stockId;
        String result = File.readFile(filePath);
        DataMapper<Stock> dataMapper = DataMapper.getInstance();
        Stock stock = dataMapper.map(result, Stock.class);
        Optional<PeDetail> peDetails = getPEDetails(stockId);
        peDetails.ifPresent(pe -> {
            stock.setSectorPE(pe.getSectorPE());
            stock.setSector(pe.getSector());
        });
        return stock;
    }

    public boolean isPresent(String stockId) {
        String filePath = homeDirectory + "/stocks/data/" + stockId;
        return File.exists(filePath);
    }

    public List<String> getAllStockNames() {
        String filePath = homeDirectory + "/stocks/data";
        List<String> fileNames = File.getFilesInADirectory(filePath);
        return fileNames;
    }

    private Optional<PeDetail> getPEDetails(String stockId) {
        String filePath = homeDirectory + "/stocks/PE/" + stockId;
        if (!File.exists(filePath))
            return Optional.empty();
        String result = File.readFile(filePath);

        DataMapper<PeDetail> dataMapper = DataMapper.getInstance();
        PeDetail peDetail = dataMapper.map(result, PeDetail.class);
        return Optional.of(peDetail);
    }
}