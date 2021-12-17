package com.project.stocks.repository;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Scanner;

@Component
public class S3Repository {

    @Value("${region}")
    private String region;

    public String getData(String bucketName, String key) {
        String result = "";
        try {
            final AmazonS3 s3 = AmazonS3ClientBuilder.standard().withRegion(region).build();
            S3Object s3Object = s3.getObject(bucketName, key);
            S3ObjectInputStream s3is = s3Object.getObjectContent();
            Scanner s = new Scanner(s3is);
            StringBuilder sb = new StringBuilder();
            while (s.hasNext()) {
                sb.append(s.next());
            }
            result = sb.toString();
            s3is.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result;
    }
}
