package com.project.stocks.controller;

import com.project.stocks.repository.HoldingsRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class HoldingsControllerTest {
    @TempDir Path dataDirectory;

    @Test
    void savesUpdatesAndRemovesHoldingsAcrossRepositoryInstances() throws Exception {
        HoldingsController controller = new HoldingsController(new HoldingsRepository(dataDirectory));
        assertEquals(Map.of(), controller.getAll());
        controller.setQuantity("tcs", new HoldingsController.HoldingRequest(new BigDecimal("10")));
        controller.setQuantity("INFY", new HoldingsController.HoldingRequest(new BigDecimal("5")));
        controller.setQuantity("TCS", new HoldingsController.HoldingRequest(new BigDecimal("12")));
        HoldingsController reloaded = new HoldingsController(new HoldingsRepository(dataDirectory));
        assertEquals(Map.of("TCS", 12, "INFY", 5), reloaded.getAll());
        reloaded.setQuantity("TCS", new HoldingsController.HoldingRequest(BigDecimal.ZERO));
        assertEquals(Map.of("INFY", 5), controller.getAll());
    }

    @Test
    void rejectsInvalidQuantitiesWithoutChangingHoldings() throws Exception {
        HoldingsController controller = new HoldingsController(new HoldingsRepository(dataDirectory));
        controller.setQuantity("TCS", new HoldingsController.HoldingRequest(BigDecimal.TEN));
        for (BigDecimal quantity : new BigDecimal[]{new BigDecimal("-1"), new BigDecimal("1.5"), new BigDecimal("2147483648")}) {
            assertThrows(ResponseStatusException.class, () -> controller.setQuantity("TCS", new HoldingsController.HoldingRequest(quantity)));
        }
        assertThrows(ResponseStatusException.class, () -> controller.setQuantity("TCS", new HoldingsController.HoldingRequest(null)));
        assertEquals(Map.of("TCS", 10), controller.getAll());
    }

    @Test
    void doesNotOverwriteUnreadableHoldings() throws Exception {
        Path file = dataDirectory.resolve("holdings.json");
        Files.writeString(file, "invalid json");
        HoldingsRepository repository = new HoldingsRepository(dataDirectory);
        assertThrows(Exception.class, () -> repository.setQuantity("TCS", 1));
        assertEquals("invalid json", Files.readString(file));
    }
}
