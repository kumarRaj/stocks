package com.project.stocks.service;


import com.project.stocks.dto.Logic;
import com.project.stocks.dto.YearInfo;
import com.project.stocks.model.Score;
import com.project.stocks.model.ScoreBreakdown;

import java.util.List;
import java.util.stream.Collectors;

import static com.project.stocks.dto.Logic.Decreasing;


public class ScoreBuilder {

    private static final int MISSING_PE_SENTINEL = -999999;

    private ScoreBreakdown scoreBreakdown = new ScoreBreakdown();

    public ScoreBuilder withPE(Integer pe) {
        if (pe == null || pe == MISSING_PE_SENTINEL) {
            scoreBreakdown.addMissingField("PE");
            return this;
        }
        int pEScoreValue;
        if (pe >= 1 && pe < 20)
            pEScoreValue = 5;
        else if (pe >= 20 && pe < 40)
            pEScoreValue = 4;
        else if (pe >= 40 && pe < 60)
            pEScoreValue = 3;
        else if (pe >= 60 && pe < 80)
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
        if (!isScoreable(opmList)) {
            scoreBreakdown.addMissingField("OPM");
            return this;
        }
        int opmScoreValue = calculateYearlyStatistics(opmList, Logic.Increasing);
        scoreBreakdown.setOperatingProfitMargin(opmScoreValue);
        return this;
    }

    public ScoreBuilder withDate(String lastUpdatedAt) {
        scoreBreakdown.setLastUpdatedAt(lastUpdatedAt);
        return this;
    }

    public ScoreBuilder withNPM(List<YearInfo> npmList) {
        if (!isScoreable(npmList)) {
            scoreBreakdown.addMissingField("NPM");
            return this;
        }
        int npmScoreValue = calculateYearlyStatistics(npmList, Logic.Increasing);
        scoreBreakdown.setNetProfitMargin(npmScoreValue);
        return this;
    }

    public ScoreBuilder withReserve(List<YearInfo> revenueDetails) {
        if (!isScoreable(revenueDetails)) {
            scoreBreakdown.addMissingField("Reserves");
            return this;
        }
        int revenueScoreValue = calculateYearlyStatistics(revenueDetails, Logic.Increasing);
        scoreBreakdown.setReserves(revenueScoreValue);
        return this;
    }

    public ScoreBuilder withBorrowings(List<YearInfo> borrowingsDetails) {
        if (!isScoreable(borrowingsDetails)) {
            scoreBreakdown.addMissingField("Borrowings");
            return this;
        }
        int borrowingScoreValue = calculateYearlyStatistics(borrowingsDetails, Decreasing);
        scoreBreakdown.setBorrowings(borrowingScoreValue);
        return this;
    }

    public ScoreBuilder withOtherLiabilities(List<YearInfo> otherLiabilitiesDetails) {
        if (!isScoreable(otherLiabilitiesDetails)) {
            scoreBreakdown.addMissingField("OtherLiabilities");
            return this;
        }
        int liabilitiesScoreValue = calculateYearlyStatistics(otherLiabilitiesDetails, Decreasing);
        scoreBreakdown.setLiabilities(liabilitiesScoreValue);
        return this;
    }

    private boolean isScoreable(List<YearInfo> yearInfoList) {
        return yearInfoList != null
                && getLast6YearsRecordInDescendingOrder(yearInfoList).size() >= 2;
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
