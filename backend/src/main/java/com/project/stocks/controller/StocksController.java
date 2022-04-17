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

    @Autowired
    private StockService stockService;

    @ApiOperation(value = "Fetch stock details for the given stock ID")
    @GetMapping(value = "/{stockId}")
    private Stock getStockDetails(@PathVariable(value = "stockId") String stockId) {
        return stockService.getStockDetails(stockId);
    }

    @ApiOperation(value = "Fetch score of given stock ID")
    @GetMapping(value = "/{stockId}/score")
    private Score calculateScore(@PathVariable(value = "stockId") String stockId) {
        return stockService.calculateScore(stockId);
    }

    @ApiOperation(value = "Fetch score of all companies present in DB")
    @GetMapping(value="/scores")
    private List<Score> calculateAllScores(){
        return stockService.calculateScoreOfAllCompanies();
    }

}
