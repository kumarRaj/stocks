package com.project.stocks.repository;

import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.nio.file.AtomicMoveNotSupportedException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;

@Repository
public class HoldingsRepository {
    private final Path path;
    private final ObjectMapper mapper = new ObjectMapper();

    @Autowired
    public HoldingsRepository() {
        this(Path.of(System.getenv().getOrDefault("STOCKS_DATA_DIR", System.getProperty("user.home") + "/stocks")));
    }

    public HoldingsRepository(Path dataDirectory) {
        this.path = dataDirectory.resolve("holdings.json");
    }

    public synchronized Map<String, Integer> getAll() throws IOException {
        if (!Files.exists(path)) return new HashMap<>();
        return mapper.readValue(Files.readString(path), new TypeReference<Map<String, Integer>>() {});
    }

    public synchronized Map<String, Integer> setQuantity(String stockId, int quantity) throws IOException {
        Map<String, Integer> holdings = getAll();
        if (quantity == 0) holdings.remove(stockId);
        else holdings.put(stockId, quantity);
        Files.createDirectories(path.getParent());
        Path temporary = Files.createTempFile(path.getParent(), "holdings-", ".tmp");
        try {
            Files.writeString(temporary, mapper.writeValueAsString(holdings));
            try {
                Files.move(temporary, path, StandardCopyOption.ATOMIC_MOVE, StandardCopyOption.REPLACE_EXISTING);
            } catch (AtomicMoveNotSupportedException e) {
                Files.move(temporary, path, StandardCopyOption.REPLACE_EXISTING);
            }
        } finally {
            Files.deleteIfExists(temporary);
        }
        return holdings;
    }
}
