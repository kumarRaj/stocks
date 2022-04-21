package com.project.stocks.repository;

import okhttp3.*;

import java.io.IOException;
import java.util.Map;

public class OKHttpCallTemplate {

    private static OkHttpClient client = new OkHttpClient();
    private static final MediaType JSON = MediaType.get("application/json; charset=utf-8");

    public static Response postCall(String requestURL, Map<String, String> queryParameter, String body){
        Response response = null;
        try {
            HttpUrl.Builder urlBuilder
                    = HttpUrl.parse(requestURL).newBuilder();

            for (String key: queryParameter.keySet())
                urlBuilder.addQueryParameter(key, queryParameter.get(key));

            String url = urlBuilder.build().toString();

            RequestBody requestBody = RequestBody.create(body, JSON);

            Request request = new Request.Builder()
                    .url(url)
                    .post(requestBody)
                    .build();

            Call call = client.newCall(request);
            response = call.execute();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return response;
    }
}
