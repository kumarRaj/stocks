package com.project.stocks.repository;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.project.stocks.dto.Stock;
import com.project.stocks.service.DataMapper;
import org.springframework.stereotype.Component;

import java.io.*;
import java.util.Scanner;

@Component
public class StockRepository {

    public Stock getStockDetails(String stockId) {
        final AmazonS3 s3 = AmazonS3ClientBuilder.standard().withRegion(Regions.US_EAST_1).build();
        Stock stock = new Stock();
        try {
            String key_name = "data/" + stockId;
            S3Object o = s3.getObject("stock-ui-bucket", key_name);
            S3ObjectInputStream s3is = o.getObjectContent();
            Scanner s = new Scanner(s3is);
            StringBuilder sb = new StringBuilder();
            while(s.hasNext()){
                sb.append(s.next());
            }
            String result = sb.toString();
            // String result = "{\"stockId\":\"INFY\",\"MarketCap\":{\"unit\":\"Cr\",\"value\":711430},\"PE\":{\"unit\":\"\",\"value\":34},\"Dividend\":{\"unit\":\"%\",\"value\":1},\"FaceValue\":{\"unit\":\"\",\"value\":5},\"OPM\":{\"data\":[{\"year\":2010,\"value\":34},{\"year\":2011,\"value\":33},{\"year\":2012,\"value\":32},{\"year\":2013,\"value\":29},{\"year\":2014,\"value\":27},{\"year\":2015,\"value\":28},{\"year\":2016,\"value\":27},{\"year\":2017,\"value\":27},{\"year\":2018,\"value\":27},{\"year\":2019,\"value\":24},{\"year\":2020,\"value\":25},{\"year\":2021,\"value\":28}],\"TTM\":27,\"unit\":\"%\"},\"NPM\":{\"data\":[{\"year\":2010,\"value\":6266},{\"year\":2011,\"value\":6835},{\"year\":2012,\"value\":8332},{\"year\":2013,\"value\":9429},{\"year\":2014,\"value\":10656},{\"year\":2015,\"value\":12372},{\"year\":2016,\"value\":13489},{\"year\":2017,\"value\":14353},{\"year\":2018,\"value\":16029},{\"year\":2019,\"value\":15404},{\"year\":2020,\"value\":16594},{\"year\":2021,\"value\":19351}],\"TTM\":20889,\"unit\":\"Cr\"},\"Debt\":{\"Revenue\":{\"data\":[{\"year\":2010,\"value\":22763},{\"year\":2011,\"value\":25690},{\"year\":2012,\"value\":31046},{\"year\":2013,\"value\":37708},{\"year\":2014,\"value\":44244},{\"year\":2015,\"value\":50164},{\"year\":2016,\"value\":60600},{\"year\":2017,\"value\":67838},{\"year\":2018,\"value\":63835},{\"year\":2019,\"value\":62778},{\"year\":2020,\"value\":63328},{\"year\":2021,\"value\":74227},{\"year\":2021,\"value\":67842}],\"unit\":\"Cr\"},\"Borrowings\":{\"data\":[{\"year\":2010,\"value\":0},{\"year\":2011,\"value\":0},{\"year\":2012,\"value\":0},{\"year\":2013,\"value\":0},{\"year\":2014,\"value\":0},{\"year\":2015,\"value\":0},{\"year\":2016,\"value\":0},{\"year\":2017,\"value\":0},{\"year\":2018,\"value\":0},{\"year\":2019,\"value\":0},{\"year\":2020,\"value\":4633},{\"year\":2021,\"value\":5325},{\"year\":2021,\"value\":5146}],\"unit\":\"Cr\"},\"OtherLiabilities\":{\"data\":[{\"year\":2010,\"value\":4455},{\"year\":2011,\"value\":5317},{\"year\":2012,\"value\":7025},{\"year\":2013,\"value\":8281},{\"year\":2014,\"value\":12436},{\"year\":2015,\"value\":15553},{\"year\":2016,\"value\":13354},{\"year\":2017,\"value\":14166},{\"year\":2018,\"value\":14426},{\"year\":2019,\"value\":19118},{\"year\":2020,\"value\":21717},{\"year\":2021,\"value\":25835},{\"year\":2021,\"value\":31025}],\"unit\":\"Cr\"}}}";
            // String result = "{\"stockId\":\"INFY\",\"MarketCap\":{\"unit\":\"Cr\",\"value\":711430},\"PE\":{\"unit\":\"NA\",\"value\":34},\"Dividend\":{\"unit\":\"%\",\"value\":1},\"FaceValue\":{\"unit\":\"NA\",\"value\":5},\"OPM\":{\"data\":[{\"year\":2010,\"value\":34},{\"year\":2011,\"value\":33},{\"year\":2012,\"value\":32},{\"year\":2013,\"value\":29},{\"year\":2014,\"value\":27},{\"year\":2015,\"value\":28},{\"year\":2016,\"value\":27},{\"year\":2017,\"value\":27},{\"year\":2018,\"value\":27},{\"year\":2019,\"value\":24},{\"year\":2020,\"value\":25},{\"year\":2021,\"value\":28}],\"TTM\":27,\"unit\":\"%\"},\"NPM\":{\"data\":[{\"year\":2010,\"value\":6266},{\"year\":2011,\"value\":6835},{\"year\":2012,\"value\":8332},{\"year\":2013,\"value\":9429},{\"year\":2014,\"value\":10656},{\"year\":2015,\"value\":12372},{\"year\":2016,\"value\":13489},{\"year\":2017,\"value\":14353},{\"year\":2018,\"value\":16029},{\"year\":2019,\"value\":15404},{\"year\":2020,\"value\":16594},{\"year\":2021,\"value\":19351}],\"TTM\":20889,\"unit\":\"Cr\"},\"Debt\":{\"Revenue\":{\"data\":[{\"year\":2010,\"value\":22763},{\"year\":2011,\"value\":25690},{\"year\":2012,\"value\":31046},{\"year\":2013,\"value\":37708},{\"year\":2014,\"value\":44244},{\"year\":2015,\"value\":50164},{\"year\":2016,\"value\":60600},{\"year\":2017,\"value\":67838},{\"year\":2018,\"value\":63835},{\"year\":2019,\"value\":62778},{\"year\":2020,\"value\":63328},{\"year\":2021,\"value\":74227},{\"year\":2021,\"value\":67842}],\"unit\":\"Cr\"},\"Borrowings\":{\"data\":[{\"year\":2010,\"value\":0},{\"year\":2011,\"value\":0},{\"year\":2012,\"value\":0},{\"year\":2013,\"value\":0},{\"year\":2014,\"value\":0},{\"year\":2015,\"value\":0},{\"year\":2016,\"value\":0},{\"year\":2017,\"value\":0},{\"year\":2018,\"value\":0},{\"year\":2019,\"value\":0},{\"year\":2020,\"value\":4633},{\"year\":2021,\"value\":5325},{\"year\":2021,\"value\":5146}],\"unit\":\"Cr\"},\"OtherLiabilities\":{\"data\":[{\"year\":2010,\"value\":4455},{\"year\":2011,\"value\":5317},{\"year\":2012,\"value\":7025},{\"year\":2013,\"value\":8281},{\"year\":2014,\"value\":12436},{\"year\":2015,\"value\":15553},{\"year\":2016,\"value\":13354},{\"year\":2017,\"value\":14166},{\"year\":2018,\"value\":14426},{\"year\":2019,\"value\":19118},{\"year\":2020,\"value\":21717},{\"year\":2021,\"value\":25835},{\"year\":2021,\"value\":31025}],\"unit\":\"Cr\"}}}";
            stock = DataMapper.mapStock(result);
            s3is.close();
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return stock;
    }
}