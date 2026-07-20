package utils;

import datastructures.Trie;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;

public class DictionaryLoader {

    public static void loadDictionary(
            String filePath,
            Trie trie,
            ArrayList<String> dictionaryWords,
            HashSet<String> dictionarySet,
            HashMap<String, Integer> frequency
    ) {

        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {

            String word;

            while ((word = reader.readLine()) != null) {

                word = word.trim().toLowerCase();

                if (word.isEmpty()) {
                    continue;
                }

                trie.insert(word);

                dictionaryWords.add(word);

                dictionarySet.add(word);

                frequency.put(word, 0);
            }

            System.out.println("Dictionary Loaded Successfully.");

        } catch (IOException e) {

            e.printStackTrace();

        }
    }
}