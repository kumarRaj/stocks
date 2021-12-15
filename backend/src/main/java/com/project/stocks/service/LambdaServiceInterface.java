package com.project.stocks.service;

import org.springframework.stereotype.Service;
import com.amazonaws.services.lambda.invoke.LambdaFunction;

@Service
public interface LambdaServiceInterface {
    @LambdaFunction(functionName = "serverlessrepo-hello-world-helloworld-QdnscDL9v4x1")
    public void generateStockInformation(String stockId);
}
