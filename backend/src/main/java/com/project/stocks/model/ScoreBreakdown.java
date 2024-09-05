package com.project.stocks.model;

public class ScoreBreakdown {

    private int pe;

    private int operatingProfitMargin;

    private int netProfitMargin;

    private int reserves;

    private int liabilities;

    private int borrowings;
    private String lastUpdatedAt;

    public int fetchBreakdownSummation() {
        int sum = pe + operatingProfitMargin + netProfitMargin +
            reserves + liabilities +borrowings;
        return sum;
    }

    public int getPe() {
        return pe;
    }

    public void setPe(int pe) {
        this.pe = pe;
    }

    public int getOperatingProfitMargin() {
        return operatingProfitMargin;
    }

    public void setOperatingProfitMargin(int operatingProfitMargin) {
        this.operatingProfitMargin = operatingProfitMargin;
    }

    public int getNetProfitMargin() {
        return netProfitMargin;
    }

    public void setNetProfitMargin(int netProfitMargin) {
        this.netProfitMargin = netProfitMargin;
    }

    public int getReserves() {
        return reserves;
    }

    public void setReserves(int reserve) {
        this.reserves = reserve;
    }

    public int getLiabilities() {
        return liabilities;
    }

    public void setLiabilities(int liabilities) {
        this.liabilities = liabilities;
    }

    public int getBorrowings() {
        return borrowings;
    }

    public void setBorrowings(int borrowings) {
        this.borrowings = borrowings;
    }

    public String getLastUpdatedAt() {
        return lastUpdatedAt;
    }

    public void setLastUpdatedAt(String lastUpdatedAt) {
        this.lastUpdatedAt = lastUpdatedAt;
    }
}
