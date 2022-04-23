package com.project.stocks.model;

public class PeDetail {

    private String name;

    private String sector;

    private Integer pe;

    private Integer sectorPE;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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