package com.project.stocks.service;

import org.springframework.stereotype.Service;
import com.amazonaws.services.lambda.AWSLambdaClientBuilder;
import com.amazonaws.services.lambda.invoke.LambdaInvokerFactory;

@Service
public class LambdaService {
    public LambdaServiceInterface lambdaService;
    
    public LambdaService(){
        lambdaService = LambdaInvokerFactory.builder()
        .lambdaClient(AWSLambdaClientBuilder.defaultClient())
        .build(LambdaServiceInterface.class);
    }

    public void generateStockInformation(String stockId) {
        try {
            lambdaService.generateStockInformation(stockId);
        } catch (Exception e) {
            System.out.println("Couldn't load data for stock : " + stockId +
                    " Error : " + e.getMessage());
        }
    }
}
