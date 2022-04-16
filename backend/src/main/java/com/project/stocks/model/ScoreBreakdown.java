package com.project.stocks.model;

import java.lang.reflect.Field;

public class ScoreBreakdown {

    private int pe;

    private int operatingProfitMargin;

    private int netProfitMargin;

    private int revenue;

    private int liabilities;

    private int borrowings;

    public int getBreakdownSummation() {
        int sum = 0;
        try {
            Field[] allFields = this.getClass().getDeclaredFields();
            for (Field field : allFields) {
                sum += (int)field.get(this);
            }
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }
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

    public int getRevenue() {
        return revenue;
    }

    public void setRevenue(int revenue) {
        this.revenue = revenue;
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
}
