package com.project.stocks.repository;

import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public class ScrapingClient {

    @Value("${ScrapperServiceURL}")
    private String scrapperServiceURL;

    public void add(String stockId)  {

        String requestURL = scrapperServiceURL + "/stockDetails";
        scrapeData(stockId, requestURL);

    }

    public void addPE(String stockId) {
        String requestURL = scrapperServiceURL + "/getPEDetails";
        scrapeData(stockId, requestURL);
    }

    public void addPeers(String stockId) {
        String requestURL = scrapperServiceURL + "/getPeers";

        scrapeData(stockId, requestURL);
    }

    private void scrapeData(String stockId, String requestURL) {
        Map<String, String> queryParameter = new HashMap<>();
        queryParameter.put("stockId", stockId);

        Response response = OKHttpCallTemplate.postCall(requestURL, queryParameter, "");

        int responseCode = response.code();
        if(responseCode != 200)
            System.out.println("Response Code for "+ stockId + " is : " + responseCode);
    }


}
