package com.project.stocks.model;

public class Score {

    private int score = 0;
    public final int total = 30;

    public String stockId;

    private ScoreBreakdown scoreBreakdown;

    public Score(ScoreBreakdown scoreBreakdown) {
        this.scoreBreakdown = scoreBreakdown;
        calculate();
    }

    public Score(String stockId) {
        this.stockId = stockId;
    }

    public int getScore() {
        return score;
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

    private void calculate() {
        score = scoreBreakdown.fetchBreakdownSummation();
    }
}
