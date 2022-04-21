package com.project.stocks.repository;

import com.project.stocks.dto.Peer;
import com.project.stocks.model.PEDetail;
import com.project.stocks.service.DataMapper;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

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
            int responseCode = response.code();
            if(responseCode != 200)
                System.out.println("Response Code for "+ stockId + " is : " + responseCode);
        } catch (IOException e) {
            System.out.println("Exception in ScrapingClient, method : add " + e.getMessage());
            e.printStackTrace();
        }

    }

    public PEDetail getPEDetails(String stockId) {
        try {
            String requestURL = scrapperServiceURL + "/getPEDetails";

            HttpUrl.Builder urlBuilder
                    = HttpUrl.parse(requestURL).newBuilder();
            urlBuilder.addQueryParameter("stockId", stockId);

            String url = urlBuilder.build().toString();

            Request request = new Request.Builder()
                    .url(url)
                    .get()
                    .addHeader("Content-Type", "application/json")
                    .build();
            Call call = client.newCall(request);
            Response response = call.execute();

            DataMapper<PEDetail> dataMapper = DataMapper.getInstance();
            PEDetail peDetail = dataMapper.map(response.body().string(), PEDetail.class);

            return peDetail;
        } catch (IOException ioException) {
            System.out.println("Exception in ScrapingClient, method : add " + ioException.getMessage());
            ioException.printStackTrace();
        }
        return null;
    }

    public List<Peer> getPeerDetails(String stockId) {
        List<Peer> peerList = new ArrayList<>();
        try {
            String requestURL = scrapperServiceURL + "/getPeers";

            HttpUrl.Builder urlBuilder
                    = HttpUrl.parse(requestURL).newBuilder();
            urlBuilder.addQueryParameter("stockId", stockId);

            String url = urlBuilder.build().toString();

            Request request = new Request.Builder()
                    .url(url)
                    .get()
                    .addHeader("Content-Type", "application/json")
                    .build();
            Call call = client.newCall(request);
            Response response = call.execute();

            DataMapper<List> dataMapper = DataMapper.getInstance();
            peerList.addAll(dataMapper.map(response.body().string(), List.class));
        } catch (IOException ioException) {
            System.out.println("Exception in ScrapingClient, method : add " + ioException.getMessage());
            ioException.printStackTrace();
        }
        return peerList;
    }
}
