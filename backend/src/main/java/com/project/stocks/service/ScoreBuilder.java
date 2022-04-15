package com.project.stocks.service;


import com.project.stocks.dto.Logic;
import com.project.stocks.dto.YearInfo;
import com.project.stocks.model.Score;

import java.util.List;
import java.util.stream.Collectors;

import static com.project.stocks.dto.Logic.Decreasing;


public class ScoreBuilder {

    private Score score = new Score();
    private ScoreBuilder scoreBuilder = null;


    public ScoreBuilder withPE(Integer pe) {
        int sum = 0;
        if (pe >= 1 && pe <= 20)
            sum = 5;
        else if (pe >= 21 && pe <= 40)
            sum = 4;
        else if (pe >= 41 && pe <= 60)
            sum = 3;
        else if (pe >= 61 && pe <= 80)
            sum = 2;
        else
            sum = 1;
        score.addValue(sum);
        score.getScoreBreakdown().setPe(sum);
        return this;
    }


    private ScoreBuilder() {
    }

    public static ScoreBuilder getInstance() {
        return new ScoreBuilder();
    }

    public Score build() {
        return score;
    }


    public ScoreBuilder withOPM(List<YearInfo> opmList) {
        int value = calculateYearlyStatistics(opmList, Logic.Increasing);
        score.addValue(value);
        score.getScoreBreakdown().setOperatingProfitMargin(value);
        return this;
    }

    public ScoreBuilder withNPM(List<YearInfo> npmList) {
        int value = calculateYearlyStatistics(npmList, Logic.Increasing);
        score.addValue(value);
        score.getScoreBreakdown().setNetProfitMargin(value);
        return this;
    }

    public ScoreBuilder withRevenue(List<YearInfo> revenueDetails) {
        int value = calculateYearlyStatistics(revenueDetails, Logic.Increasing);
        score.addValue(value);
        score.getScoreBreakdown().setRevenue(value);
        return this;
    }

    public ScoreBuilder withBorrowings(List<YearInfo> borrowingsDetails) {
        int value = calculateYearlyStatistics(borrowingsDetails, Decreasing);
        score.addValue(value);
        score.getScoreBreakdown().setRevenue(value);
        return this;
    }

    public ScoreBuilder withOtherLiabilities(List<YearInfo> otherLiabilitiesDetails) {
        int value = calculateYearlyStatistics(otherLiabilitiesDetails, Decreasing);
        score.addValue(value);
        score.getScoreBreakdown().setLiabilities(value);
        return this;
    }

    /*
    1.  If logic is "Increasing" then the score will increase if present
        year value is greater than previous year value.
    2.  If logic is "Decreasing" then the score will increase if present
        year value is less than previous year value.
    */
    private int calculateYearlyStatistics(List<YearInfo> inputList, Logic logic) {
        List<YearInfo> last6YearsOPMList = getLast6YearsRecordInDescendingOrder(inputList);
        int score = 0;
        for (int i = 1; i < last6YearsOPMList.size(); i++) {
            int presentYear = last6YearsOPMList.get(i - 1).getValue();
            int previousYear = last6YearsOPMList.get(i).getValue();
            if (logic.equals(Logic.Increasing)) {
                if (presentYear > previousYear)
                    score++;
            } else if (logic.equals(Decreasing)) {
                if (presentYear < previousYear)
                    score++;
            }
        }
        return score;
    }

    private List<YearInfo> getLast6YearsRecordInDescendingOrder(List<YearInfo> inputList) {
        List<YearInfo> last6Years = inputList.stream()
                .sorted((a, b) -> b.getYear() - a.getYear())
                .limit(6)
                .collect(Collectors.toList());
        return last6Years;
    }
}
