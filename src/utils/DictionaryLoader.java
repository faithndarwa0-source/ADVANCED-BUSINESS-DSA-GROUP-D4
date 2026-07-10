package utils;
import datastructures.Trie;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class DictionaryLoader {

    public static void loadDictionary(String filePath, Trie trie){
        try (BufferedReader reader=new BufferedReader(new FileReader(filePath))){
            String word;
            while((word= reader.readLine()) !=null){
                word=word.trim().toLowerCase();
                if(!word.isEmpty()){
                    trie.insert(word);
                }
            }

            System.out.println("Dictionary loaded successfully.");

        }

        catch (IOException e){
            System.out.println("Error loading dictionary.");
            e.printStackTrace();
        }

    }
}
