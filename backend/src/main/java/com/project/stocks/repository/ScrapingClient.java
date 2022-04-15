package com.project.stocks.repository;

import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.io.IOException;

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
}
