package com.project.stocks.controller;

import com.project.stocks.dto.Stock;
import com.project.stocks.model.Score;
import com.project.stocks.service.StockService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping(value = "/stock")
public class StocksController {

    private final StockService stockService;

    public StocksController(StockService stockService) {
        this.stockService = stockService;
    }

    @ApiOperation(value = "Fetch stock details for the given stock id")
    @GetMapping(value = "/{stockId}")
    private Stock getStockDetails(@PathVariable(value = "stockId") String stockId) {
        return stockService.getStockDetails(stockId);
    }

    @ApiOperation(value = "Fetch score for given stock id")
    @GetMapping(value = "/{stockId}/score")
    private Score calculateScore(@PathVariable(value = "stockId") String stockId) {
        return stockService.calculateScore(stockId);
    }

    @ApiOperation(value = "Fetch score for all companies present in the application")
    @GetMapping(value="/scores")
    private List<Score> calculateAllScores(){
        return stockService.calculateScoreOfAllCompanies();
    }

}
