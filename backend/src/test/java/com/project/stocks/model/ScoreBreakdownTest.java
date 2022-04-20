package com.project.stocks.model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ScoreBreakdownTest {

    @Test
    void calculateScoreIfAllValuesArePresent() {
        ScoreBreakdown scoreBreakdown = new ScoreBreakdown();
        scoreBreakdown.setRevenue(1);
        scoreBreakdown.setBorrowings(2);
        scoreBreakdown.setPe(3);
        scoreBreakdown.setLiabilities(3);
        scoreBreakdown.setNetProfitMargin(1);
        scoreBreakdown.setOperatingProfitMargin(2);

        int score = scoreBreakdown.fetchBreakdownSummation();

        assertEquals(12, score);
    }

    @Test
    void calculateScoreIfSomeValuesAreMissing() {
        ScoreBreakdown scoreBreakdown = new ScoreBreakdown();
        scoreBreakdown.setRevenue(1);
        scoreBreakdown.setBorrowings(2);
        scoreBreakdown.setNetProfitMargin(1);
        scoreBreakdown.setOperatingProfitMargin(2);

        int score = scoreBreakdown.fetchBreakdownSummation();

        assertEquals(6, score);
    }
}