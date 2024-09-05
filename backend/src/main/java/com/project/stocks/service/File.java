package com.project.stocks.service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.Path;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class File {

    public static String readFile(String filePath){
        try {
            // Read all bytes from the file and convert it to a string using the default charset
            return Files.readString(Paths.get(filePath), StandardCharsets.UTF_8);
        } catch (IOException e) {
            System.out.println("Exception in reading file content: " + e.getMessage());
            e.printStackTrace();
            return "";
        }
    }

    public static boolean exists(String filePath) {
        return Files.exists(Paths.get(filePath));
    }

    public static List<String> getFilesInADirectory(String directoryPath) {
        if (!exists(directoryPath)){
            System.out.println("Directory does not exist");
            return Collections.emptyList();
        }
        try {
            Path dirPath = Paths.get(directoryPath);
            return Files.list(dirPath)
                    .filter(Files::isRegularFile)  // Only include regular files
                    .map(Path::getFileName)        // Get just the file name
                    .map(Path::toString)           // Convert to String
                    .collect(Collectors.toList()); // Collect into a List
        } catch (IOException e) {
            e.printStackTrace(); // Handle the exception as per your requirements
            return Collections.emptyList();
        }
    }
}
