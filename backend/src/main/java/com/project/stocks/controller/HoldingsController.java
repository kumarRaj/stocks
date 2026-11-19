package com.project.stocks.controller;

import com.project.stocks.repository.HoldingsRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.Locale;
import java.util.Map;

@RestController
@RequestMapping("/holdings")
public class HoldingsController {
    private final HoldingsRepository repository;

    public HoldingsController(HoldingsRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public Map<String, Integer> getAll() throws IOException {
        return repository.getAll();
    }

    @PutMapping("/{stockId}")
    public Map<String, Integer> setQuantity(@PathVariable String stockId, @RequestBody HoldingRequest request) throws IOException {
        String symbol = stockId.toUpperCase(Locale.ROOT);
        if (!symbol.matches("[A-Z0-9][A-Z0-9._-]*") || request.quantity() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid symbol or quantity");
        }
        int quantity;
        try {
            quantity = request.quantity().intValueExact();
        } catch (ArithmeticException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Quantity must be a whole number");
        }
        if (quantity < 0) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Quantity cannot be negative");
        return repository.setQuantity(symbol, quantity);
    }

    public record HoldingRequest(BigDecimal quantity) {}
}
