package com.project.stocks.model;

public class PeDetail {

    private String stockId;

    private String sector;

    private Integer pe;

    private Integer sectorPE;

    public String getStockId() {
        return stockId;
    }

    public void setStockId(String stockId) {
        this.stockId = stockId;
    }

    public String getSector() {
        return sector;
    }

    public void setSector(String sector) {
        this.sector = sector;
    }

    public Integer getPe() {
        return pe;
    }

    public void setPe(Integer pe) {
        this.pe = pe;
    }

    public Integer getSectorPE() {
        return sectorPE;
    }

    public void setSectorPE(Integer sectorPE) {
        this.sectorPE = sectorPE;
    }
}