package com.project.stocks.repository;

import com.project.stocks.dto.Peer;
import com.project.stocks.dto.Stock;
import com.project.stocks.model.PEDetail;
import com.project.stocks.service.DataMapper;
import com.project.stocks.service.File;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class StockRepository {

    String homeDirectory = System.getProperty("user.home");

    public Optional<Stock> getStockDetails(String stockId) {
        String filePath = homeDirectory + "/stocks/data/" + stockId;
        String result = File.readFile(filePath);
        DataMapper<Stock> dataMapper = DataMapper.getInstance();
        Stock stock = dataMapper.map(result, Stock.class);
        return Optional.of(stock);
    }

    public boolean isPresent(String stockId) {
        String filePath = homeDirectory + "/stocks/data/" + stockId;
        return File.exists(filePath);
    }

    public List<String> getAllStockDetailsNames() {
        String filePath = homeDirectory + "/stocks/data";
        List<String> fileNames = File.getFilesInADirectory(filePath);
        return fileNames;
    }

    public Optional<PEDetail> getPEDetails(String stockId) {
        String filePath = homeDirectory + "/stocks/PE/" + stockId;
        if (!File.exists(filePath))
            return Optional.empty();
        String result = File.readFile(filePath);

        DataMapper<PEDetail> dataMapper = DataMapper.getInstance();
        PEDetail peDetail = dataMapper.map(result, PEDetail.class);
        return Optional.of(peDetail);
    }

    public List<Peer> getPeersList(String stockId) {
        List<Peer> peers = new ArrayList<>();
        String filePath = homeDirectory + "/stocks/Peers/" + stockId;
        if (!File.exists(filePath))
            return peers;
        String result = File.readFile(filePath);

        DataMapper<List> dataMapper = DataMapper.getInstance();
        peers.addAll(dataMapper.map(result, List.class));
        return peers;
    }

    public List<String> getAllPEStockNames() {
        String filePath = homeDirectory + "/stocks/PE";
        List<String> fileNames = File.getFilesInADirectory(filePath);
        return fileNames;
    }
}