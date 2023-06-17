package com.project.stocks.service;


import com.project.stocks.dto.Logic;
import com.project.stocks.dto.YearInfo;
import com.project.stocks.model.Score;
import com.project.stocks.model.ScoreBreakdown;

import java.util.List;
import java.util.stream.Collectors;

import static com.project.stocks.dto.Logic.Decreasing;


public class ScoreBuilder {

    private ScoreBreakdown scoreBreakdown = new ScoreBreakdown();

    public ScoreBuilder withPE(Integer pe) {
        int pEScoreValue;
        if (pe == null)
            pEScoreValue = 0;
        else if (pe >= 1 && pe <= 20)
            pEScoreValue = 5;
        else if (pe >= 21 && pe <= 40)
            pEScoreValue = 4;
        else if (pe >= 41 && pe <= 60)
            pEScoreValue = 3;
        else if (pe >= 61 && pe <= 80)
            pEScoreValue = 2;
        else
            pEScoreValue = 1;
        scoreBreakdown.setPe(pEScoreValue);
        return this;
    }


    private ScoreBuilder() {
    }

    public static ScoreBuilder getInstance() {
        return new ScoreBuilder();
    }

    public Score build() {
        Score score = new Score(scoreBreakdown);
        return score;
    }


    public ScoreBuilder withOPM(List<YearInfo> opmList) {
        int opmScoreValue = calculateYearlyStatistics(opmList, Logic.Increasing);
        scoreBreakdown.setOperatingProfitMargin(opmScoreValue);
        return this;
    }

    public ScoreBuilder withDate(String lastUpdatedAt) {
        scoreBreakdown.setLastUpdatedAt(lastUpdatedAt);
        return this;
    }

    public ScoreBuilder withNPM(List<YearInfo> npmList) {
        int npmScoreValue = calculateYearlyStatistics(npmList, Logic.Increasing);
        scoreBreakdown.setNetProfitMargin(npmScoreValue);
        return this;
    }

    public ScoreBuilder withRevenue(List<YearInfo> revenueDetails) {
        int revenueScoreValue = calculateYearlyStatistics(revenueDetails, Logic.Increasing);
        scoreBreakdown.setRevenue(revenueScoreValue);
        return this;
    }

    public ScoreBuilder withBorrowings(List<YearInfo> borrowingsDetails) {
        int borrowingScoreValue = calculateYearlyStatistics(borrowingsDetails, Decreasing);
        scoreBreakdown.setBorrowings(borrowingScoreValue);
        return this;
    }

    public ScoreBuilder withOtherLiabilities(List<YearInfo> otherLiabilitiesDetails) {
        int liabilitiesScoreValue = calculateYearlyStatistics(otherLiabilitiesDetails, Decreasing);
        scoreBreakdown.setLiabilities(liabilitiesScoreValue);
        return this;
    }

    /*
    1.  If logic is "Increasing" then the score will increase if present
        year value is greater than previous year value.
    2.  If logic is "Decreasing" then the score will increase if present
        year value is less than previous year value.
    */
    public int calculateYearlyStatistics(List<YearInfo> inputList, Logic logic) {
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
                .filter(yearInfo -> yearInfo.getYear() != null)
                .filter(yearInfo -> yearInfo.getValue() != null)
                .sorted((a, b) -> b.getYear() - a.getYear())
                .limit(6)
                .collect(Collectors.toList());
        return last6Years;
    }
}
