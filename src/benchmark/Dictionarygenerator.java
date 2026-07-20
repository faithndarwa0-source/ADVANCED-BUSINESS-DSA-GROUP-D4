package benchmark;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

public class Dictionarygenerator {

    public static void generateDictionary(String fileName, int size) {

        java.io.File file = new java.io.File(fileName);

        if (file.exists()) {

            System.out.println(fileName + " already exists.");

            return;

        }

        try (BufferedWriter writer =
                     new BufferedWriter(new FileWriter(file))) {

            for (int i = 1; i <= size; i++) {

                writer.write("word" + i);

                writer.newLine();

            }

            System.out.println("Generated " + size + " words.");

        }

        catch (IOException e) {

            e.printStackTrace();

        }

    }

}