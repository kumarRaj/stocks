package com.project.stocks.model;

public class Score {

    private int score = 0;
    public final int total = 30;

    public String stockId;

    private boolean insufficientData = false;

    private ScoreBreakdown scoreBreakdown;

    public Score(ScoreBreakdown scoreBreakdown) {
        this.scoreBreakdown = scoreBreakdown;
        this.insufficientData = scoreBreakdown == null || scoreBreakdown.hasMissingFields();
        calculate();
    }

    public Score(String stockId) {
        this.stockId = stockId;
        this.insufficientData = true;
    }

    public boolean isInsufficientData() {
        return insufficientData;
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
        if (insufficientData) {
            return;
        }
        score = scoreBreakdown.fetchBreakdownSummation();
    }
}
