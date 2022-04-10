package com.project.stocks.repository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Repository;

import java.io.DataOutputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;

@Repository
public class ScrappingRepository {

    @Value("${ScrapperServiceURL}")
    private String scrapperServiceURL;

    public void add(String stockId)  {
        String requestURL = scrapperServiceURL + "/stockDetails?stockId="+stockId;
        try {
            URL url = new URL(requestURL);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "application/json");
            con.setDoOutput(true);
            DataOutputStream out = new DataOutputStream(con.getOutputStream());
            System.out.println("Response Code for "+ stockId + " is : " +con.getResponseCode());
            out.flush();
            out.close();
        } catch (MalformedURLException malformedURLException) {
            malformedURLException.printStackTrace();
        } catch (ProtocolException protocolException) {
            protocolException.printStackTrace();
        } catch (IOException ioException) {
            ioException.printStackTrace();
        }
    }
}
