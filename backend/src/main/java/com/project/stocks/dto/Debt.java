package com.project.stocks.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Debt {

    @JsonProperty("Reserves")
    private YearlyDetail reserves;

    @JsonProperty("Borrowings")
    private YearlyDetail borrowingsDetails;

    @JsonProperty("OtherLiabilities")
    private YearlyDetail otherLiabilitiesDetails;

    public YearlyDetail getReserves() {
        return reserves;
    }

    public void setReserves(YearlyDetail reserves) {
        this.reserves = reserves;
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
                "revenueDetails=" + reserves +
                ", borrowingsDetails=" + borrowingsDetails +
                ", otherLiabilitiesDetails=" + otherLiabilitiesDetails +
                '}';
    }
}
