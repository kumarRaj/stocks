package com.project.stocks.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.stocks.model.Score;

import java.util.ArrayList;
import java.util.List;

public class StockSummary {

    @JsonProperty("stockId")
    private String id;

    @JsonProperty("stockStatistics")
    private Stock stock;

    @JsonProperty("score")
    private Score score;

    @JsonProperty("PE")
    private Integer pe;

    @JsonProperty("SectorPE")
    private Integer sectorPE;

    @JsonProperty("Sector")
    private String sector;

    @JsonProperty("Peers")
    private List<Peer> peers = new ArrayList<>();

    public StockSummary(String id, Stock stock, Integer pe, Integer sectorPE, String sector, List<Peer> peers) {
        this.id = id;
        this.stock = stock;
        this.pe = pe;
        this.sectorPE = sectorPE;
        this.sector = sector;
        this.peers = peers;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Stock getStock() {
        return stock;
    }

    public void setStock(Stock stock) {
        this.stock = stock;
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

    public String getSector() {
        return sector;
    }

    public void setSector(String sector) {
        this.sector = sector;
    }

    public List<Peer> getPeers() {
        return peers;
    }

    public void setPeers(List<Peer> peers) {
        this.peers = peers;
    }

    public Score getScore() {
        return score;
    }

    public void setScore(Score score) {
        this.score = score;
    }


}
