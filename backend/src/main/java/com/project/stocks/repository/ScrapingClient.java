package com.project.stocks.repository;

import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Repository
public class ScrapingClient {

    @Value("${ScrapperServiceURL}")
    private String scrapperServiceURL;

    private OkHttpClient client = new OkHttpClient();
    private static final MediaType JSON = MediaType.get("application/json; charset=utf-8");

    public void add(String stockId)  {
        try {
            String requestURL = scrapperServiceURL + "/stockDetails";

            HttpUrl.Builder urlBuilder
                    = HttpUrl.parse(requestURL).newBuilder();
            urlBuilder.addQueryParameter("stockId", stockId);

            String url = urlBuilder.build().toString();

            RequestBody body = RequestBody.create("", JSON);

            Request request = new Request.Builder()
                    .url(url)
                    .post(body)
                    .build();
            Call call = client.newCall(request);
            Response response = call.execute();
            System.out.println("Response Code for "+ stockId + " is : " + response.code());
        } catch (IOException e) {
            System.out.println("Exception in ScrapingClient, method : add " + e.getMessage());
            e.printStackTrace();
        }
    }

    public void addPE(String stockId) {
        String requestURL = scrapperServiceURL + "/stock/pe";
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
