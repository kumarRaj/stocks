package com.project.stocks.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class FileTest {
    private final String TEST_DIRECTORY = "src/test/resources";
    private final String TEST_FILE = "test.json";

    @BeforeEach
    void setup() throws IOException {
        // Create the test directory if it doesn't exist
        Path testDirectoryPath = Paths.get(TEST_DIRECTORY);
        if (Files.notExists(testDirectoryPath)) {
            Files.createDirectories(testDirectoryPath);
        }

        // Create the test file if it doesn't exist
        Path testFilePath = testDirectoryPath.resolve(TEST_FILE);
        if (Files.notExists(testFilePath)) {
            Files.createFile(testFilePath);
        }
    }

    @Test
    void shouldReturnFilesInADirectory() {
        List<String> filesInADirectory = File.getFilesInADirectory(TEST_DIRECTORY);
        assertEquals(1, filesInADirectory.size());
        assertEquals(TEST_FILE, filesInADirectory.get(0));
    }

    @Test
    void shouldReturnEmptyListIfDirectoryDoesNotExist() {
        String RANDOM_TEST_DIRECTORY = "src/test/random";
        List<String> filesInADirectory = File.getFilesInADirectory(RANDOM_TEST_DIRECTORY);

        assertEquals(0, filesInADirectory.size());
    }
}