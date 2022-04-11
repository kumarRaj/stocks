package com.project.stocks.service;

import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class File {

    public static String readFile(String filePath){
        try {
            java.io.File myObj = new java.io.File(filePath);
            Scanner myReader = new Scanner(myObj);

            StringBuilder sb = new StringBuilder();
            while (myReader.hasNextLine()) {
                sb.append(myReader.nextLine());
            }

            String result = sb.toString();
            return result;
        } catch (FileNotFoundException e) {
            System.out.println("Exception in reading file content : "+ e.getMessage());
            e.printStackTrace();
        }
        return "";
    }

    public static boolean exists(String filePath) {
        java.io.File file = new java.io.File(filePath);
        return file.exists();
    }

    public static List<String> getFilesInADirectory(String filePath) {
        List<String> fileNames = new ArrayList<>();
        java.io.File directory = new java.io.File(filePath);
        java.io.File[] listOfFiles = directory.listFiles();
        for (int i = 0; i < listOfFiles.length; i++) {
            if (listOfFiles[i].isFile()) {
                fileNames.add(listOfFiles[i].getName());
            }
        }
        return fileNames;
    }
}
