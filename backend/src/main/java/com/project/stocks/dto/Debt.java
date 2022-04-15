package com.project.stocks.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Debt {

    @JsonProperty("Revenue")
    private YearlyDetail revenueDetails;

    @JsonProperty("Borrowings")
    private YearlyDetail borrowingsDetails;

    @JsonProperty("OtherLiabilities")
    private YearlyDetail otherLiabilitiesDetails;

    public YearlyDetail getRevenueDetails() {
        return revenueDetails;
    }

    public void setRevenueDetails(YearlyDetail revenueDetails) {
        this.revenueDetails = revenueDetails;
    }

    public YearlyDetail getBorrowingsDetails() {
        return borrowingsDetails;
    }

    public void setBorrowingsDetails(YearlyDetail borrowingsDetails) {
        this.borrowingsDetails = borrowingsDetails;
    }

    public YearlyDetail getOtherLiabilitiesDetails() {
        return otherLiabilitiesDetails;
    }

    public void setOtherLiabilitiesDetails(YearlyDetail otherLiabilitiesDetails) {
        this.otherLiabilitiesDetails = otherLiabilitiesDetails;
    }

    @Override
    public String toString() {
        return "Debt{" +
                "revenueDetails=" + revenueDetails +
                ", borrowingsDetails=" + borrowingsDetails +
                ", otherLiabilitiesDetails=" + otherLiabilitiesDetails +
                '}';
    }
}
