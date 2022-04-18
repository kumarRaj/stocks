package com.project.stocks.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Stock {

    @JsonProperty("stockId")
    private String id;

    @JsonProperty("MarketCap")
    private StockMetric marketCap;

    @JsonProperty("FaceValue")
    private StockMetric faceValue;

    @JsonProperty("Dividend")
    private StockMetric dividend;

    @JsonProperty("OPM")
    private YearlyDetail opmDetails;

    @JsonProperty("NPM")
    private YearlyDetail npmDetails;

    @JsonProperty("Debt")
    private Debt debt;

    public Stock(String id, StockMetric marketCap, StockMetric faceValue,
                 StockMetric dividend, YearlyDetail opmDetails, YearlyDetail npmDetails, Debt debt) {
        this.id = id;
        this.marketCap = marketCap;
        this.faceValue = faceValue;
        this.dividend = dividend;
        this.opmDetails = opmDetails;
        this.npmDetails = npmDetails;
        this.debt = debt;
    }

    public Stock() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public StockMetric getMarketCap() {
        return marketCap;
    }

    public void setMarketCap(StockMetric marketCap) {
        this.marketCap = marketCap;
    }

    public StockMetric getFaceValue() {
        return faceValue;
    }

    public void setFaceValue(StockMetric faceValue) {
        this.faceValue = faceValue;
    }

    public StockMetric getDividend() {
        return dividend;
    }

    public void setDividend(StockMetric dividend) {
        this.dividend = dividend;
    }

    public YearlyDetail getOpmDetails() {
        return opmDetails;
    }

    public void setOpmDetails(YearlyDetail opmDetails) {
        this.opmDetails = opmDetails;
    }

    public YearlyDetail getNpmDetails() {
        return npmDetails;
    }

    public void setNpmDetails(YearlyDetail npmDetails) {
        this.npmDetails = npmDetails;
    }

    public Debt getDebt() {
        return debt;
    }

    public void setDebt(Debt debt) {
        this.debt = debt;
    }

    @Override
    public String toString() {
        return "Stock{" +
                "id='" + id + '\'' +
                ", marketCap='" + marketCap + '\'' +
                ", faceValue='" + faceValue + '\'' +
                ", dividend='" + dividend + '\'' +
                ", opmDetails=" + opmDetails +
                ", npmDetails=" + npmDetails +
                ", debt=" + debt +
                '}';
    }


}
