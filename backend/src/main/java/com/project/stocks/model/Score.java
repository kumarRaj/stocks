package com.project.stocks.model;

public class Score {

    private int score = 0;
    public final int total = 30;

    public String stockId;

    private ScoreBreakdown scoreBreakdown = new ScoreBreakdown();

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

    public ScoreBreakdown getScoreBreakdown() {
        return scoreBreakdown;
    }

    public void setScoreBreakdown(ScoreBreakdown scoreBreakdown) {
        this.scoreBreakdown = scoreBreakdown;
    }
}
