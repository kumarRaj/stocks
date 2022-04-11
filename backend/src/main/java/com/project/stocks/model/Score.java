package com.project.stocks.model;

import org.springframework.beans.factory.annotation.Value;

public class Score {

    private int score = 0;
    public final int total = 30;

    public String stockId;

    public int getValue() {
        return score;
    }

    public void addValue(int value) {
        this.score += value;
    }

    public String getStockId() {
        return stockId;
    }

    public void setStockId(String stockId) {
        this.stockId = stockId;
    }
}
