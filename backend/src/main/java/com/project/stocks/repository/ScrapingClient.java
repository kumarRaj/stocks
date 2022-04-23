package com.project.stocks.repository;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Response;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public class ScrapingClient {

    @Value("${ScrapperServiceURL}")
    private String scrapperServiceURL;

    private final OkHttpClient client = new OkHttpClient();
    private static final MediaType JSON = MediaType.get("application/json; charset=utf-8");

    public void add(String stockId) {
        String requestURL = "/stockDetails";
        scrapeData(stockId, requestURL);
    }

    public void addPE(String stockId) {
        String requestURL = "/stock/pe";
        scrapeData(stockId, requestURL);
    }

    private void scrapeData(String stockId, String requestURL) {
        Map<String, String> queryParameter = new HashMap<>();
        queryParameter.put("stockId", stockId);

        Response response = OKHttpCallTemplate.postCall(scrapperServiceURL + requestURL, queryParameter, "");

        int responseCode = response.code();
        if (responseCode != 200)
            System.out.println("Could not get details for stock " + stockId + " for request " + requestURL);
    }
}
