package com.project.stocks.service;

import com.project.stocks.dto.YearInfo;
import com.project.stocks.model.Score;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ScoreBuilderTest {

    private ScoreBuilder scoreBuilder;

    @BeforeEach
    private void setup() {
        scoreBuilder = ScoreBuilder.getInstance();
    }

    @Test
    void givenPERatio39ScoreShouldBe4() {
        Score score = scoreBuilder.withPE(39).build();

        assertEquals(4, score.getValue());
    }

    @Test
    void givenPERatio1ScoreShouldBe5() {
        Score score = scoreBuilder.withPE(1).build();

        assertEquals(5, score.getValue());
    }

    @Test
    void givenPERatio41ScoreShouldBe3() {
        Score score = scoreBuilder.withPE(41).build();

        assertEquals(3, score.getValue());
    }

    @Test
    void givenPERatio61ScoreShouldBe2() {
        Score score = scoreBuilder.withPE(61).build();

        assertEquals(2, score.getValue());
    }

    @Test
    void givenPERatio81ScoreShouldBe1() {
        Score score = scoreBuilder.withPE(81).build();

        assertEquals(1, score.getValue());
    }

    @Test
    void givenOPMListScoreShouldBe5ForLast6Years() {
        List<YearInfo> opmList = new ArrayList<>();
        opmList.add(new YearInfo(2010, 2));
        opmList.add(new YearInfo(2011, 3));
        opmList.add(new YearInfo(2012, 4));
        opmList.add(new YearInfo(2013, 5));
        opmList.add(new YearInfo(2014, 6));
        opmList.add(new YearInfo(2015, 7));
        Score score = scoreBuilder.withOPM(opmList).build();
        assertEquals(5, score.getValue());
    }

    @Test
    void givenOPMListScoreShouldBe4ForLast6Years() {
        List<YearInfo> opmList = new ArrayList<>();
        opmList.add(new YearInfo(2010, 2));
        opmList.add(new YearInfo(2011, 4));
        opmList.add(new YearInfo(2012, 3));
        opmList.add(new YearInfo(2013, 5));
        opmList.add(new YearInfo(2014, 6));
        opmList.add(new YearInfo(2015, 7));
        Score score = scoreBuilder.withOPM(opmList).build();

        assertEquals(4, score.getValue());
    }

    @Test
    void givenOPMListScoreShouldBe3ForLast6Years() {
        List<YearInfo> opmList = new ArrayList<>();
        opmList.add(new YearInfo(2010, 2));
        opmList.add(new YearInfo(2011, 3));
        opmList.add(new YearInfo(2012, 4));
        opmList.add(new YearInfo(2013, 5));
        opmList.add(new YearInfo(2014, 2));
        opmList.add(new YearInfo(2015, 1));
        Score score = scoreBuilder.withOPM(opmList).build();

        assertEquals(3, score.getValue());
    }

    @Test
    void givenOPMListScoreShouldBe2ForLast6Years() {
        List<YearInfo> opmList = new ArrayList<>();
        opmList.add(new YearInfo(2010, 2));
        opmList.add(new YearInfo(2011, 3));
        opmList.add(new YearInfo(2012, 4));
        opmList.add(new YearInfo(2013, 3));
        opmList.add(new YearInfo(2014, 2));
        opmList.add(new YearInfo(2015, 1));
        Score score = scoreBuilder.withOPM(opmList).build();

        assertEquals(2, score.getValue());
    }

    @Test
    void givenOPMListScoreShouldBe1ForLast6Years() {
        List<YearInfo> opmList = new ArrayList<>();
        opmList.add(new YearInfo(2010, 4));
        opmList.add(new YearInfo(2011, 5));
        opmList.add(new YearInfo(2012, 4));
        opmList.add(new YearInfo(2013, 3));
        opmList.add(new YearInfo(2014, 2));
        opmList.add(new YearInfo(2015, 1));
        Score score = scoreBuilder.withOPM(opmList).build();

        assertEquals(1, score.getValue());
    }

    @Test
    void givenOPMListScoreShouldBe0ForLast6Years() {
        List<YearInfo> opmList = new ArrayList<>();
        opmList.add(new YearInfo(2009, 5));
        opmList.add(new YearInfo(2010, 6));
        opmList.add(new YearInfo(2011, 5));
        opmList.add(new YearInfo(2012, 4));
        opmList.add(new YearInfo(2013, 3));
        opmList.add(new YearInfo(2014, 2));
        opmList.add(new YearInfo(2015, 1));
        Score score = scoreBuilder.withOPM(opmList).build();

        assertEquals(0, score.getValue());
    }

    @Test
    void givenNPMListScoreShouldBe0ForLast6Years() {
        List<YearInfo> npmList = new ArrayList<>();
        npmList.add(new YearInfo(2010, 2));
        npmList.add(new YearInfo(2011, 4));
        npmList.add(new YearInfo(2012, 3));
        npmList.add(new YearInfo(2013, 5));
        npmList.add(new YearInfo(2014, 6));
        npmList.add(new YearInfo(2015, 7));
        Score score = scoreBuilder.withNPM(npmList).build();

        assertEquals(4, score.getValue());
    }

    @Test
    void givenBorrowingsScoreShouldBe5ForLast6YearsForDecreasingBorrowings() {
        List<YearInfo> borrowingList = new ArrayList<>();
        borrowingList.add(new YearInfo(2010, 10));
        borrowingList.add(new YearInfo(2011, 9));
        borrowingList.add(new YearInfo(2012, 8));
        borrowingList.add(new YearInfo(2013, 7));
        borrowingList.add(new YearInfo(2014, 6));
        borrowingList.add(new YearInfo(2015, 5));
        Score score = scoreBuilder.withBorrowings(borrowingList).build();

        assertEquals(5, score.getValue());
    }

    @Test
    void givenBorrowingsScoreShouldBe0ForLast6YearsForIncreasingBorrowings() {
        List<YearInfo> borrowingList = new ArrayList<>();
        borrowingList.add(new YearInfo(2010, 1));
        borrowingList.add(new YearInfo(2011, 2));
        borrowingList.add(new YearInfo(2012, 3));
        borrowingList.add(new YearInfo(2013, 4));
        borrowingList.add(new YearInfo(2014, 5));
        borrowingList.add(new YearInfo(2015, 6));
        Score score = scoreBuilder.withBorrowings(borrowingList).build();

        assertEquals(0, score.getValue());
    }

    @Test
    void givenRevenueListScoreShouldBe5ForLast6YearsForDecreasingLiabilities() {
        List<YearInfo> otherLiabilitiesList = new ArrayList<>();
        otherLiabilitiesList.add(new YearInfo(2010, 10));
        otherLiabilitiesList.add(new YearInfo(2011, 9));
        otherLiabilitiesList.add(new YearInfo(2012, 8));
        otherLiabilitiesList.add(new YearInfo(2013, 7));
        otherLiabilitiesList.add(new YearInfo(2014, 6));
        otherLiabilitiesList.add(new YearInfo(2015, 5));
        Score score = scoreBuilder.withOtherLiabilities(otherLiabilitiesList).build();

        assertEquals(5, score.getValue());
    }

    @Test
    void givenOtherLiabilitiesListScoreShouldBe0ForLast6YearsForIncreasingLiabilities() {
        List<YearInfo> otherLiabilitiesList = new ArrayList<>();
        otherLiabilitiesList.add(new YearInfo(2010, 1));
        otherLiabilitiesList.add(new YearInfo(2011, 2));
        otherLiabilitiesList.add(new YearInfo(2012, 3));
        otherLiabilitiesList.add(new YearInfo(2013, 4));
        otherLiabilitiesList.add(new YearInfo(2014, 5));
        otherLiabilitiesList.add(new YearInfo(2015, 6));
        Score score = scoreBuilder.withBorrowings(otherLiabilitiesList).build();

        assertEquals(0, score.getValue());
    }

    @Test
    void givenRevenueListScoreShouldBe0ForLast6YearsForDecreasingRevenue() {
        List<YearInfo> revenueList = new ArrayList<>();
        revenueList.add(new YearInfo(2010, 10));
        revenueList.add(new YearInfo(2011, 9));
        revenueList.add(new YearInfo(2012, 8));
        revenueList.add(new YearInfo(2013, 7));
        revenueList.add(new YearInfo(2014, 6));
        revenueList.add(new YearInfo(2015, 5));
        Score score = scoreBuilder.withRevenue(revenueList).build();

        assertEquals(0, score.getValue());
    }

    @Test
    void givenRevenueListScoreShouldBe5ForLast6YearsForIncreasingRevenue() {
        List<YearInfo> revenueList = new ArrayList<>();
        revenueList.add(new YearInfo(2010, 1));
        revenueList.add(new YearInfo(2011, 2));
        revenueList.add(new YearInfo(2012, 3));
        revenueList.add(new YearInfo(2013, 4));
        revenueList.add(new YearInfo(2014, 5));
        revenueList.add(new YearInfo(2015, 6));
        Score score = scoreBuilder.withRevenue(revenueList).build();

        assertEquals(5, score.getValue());
    }

}