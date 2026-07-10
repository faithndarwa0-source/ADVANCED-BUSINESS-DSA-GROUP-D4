package engine;

import datastructures.Trie;
import utils.DictionaryLoader;
import algorithms.EditDistance;

import java.util.List;

public class SearchEngine {

    private Trie trie;
    private SearchHistory history;

    public SearchEngine() {

        trie = new Trie();
        history = new SearchHistory();

        DictionaryLoader.loadDictionary(
                "resources/dictionary.txt",
                trie
        );

    }

    // Search for a complete word
    public boolean searchWord(String word) {

        history.addSearch(word);

        return trie.search(word);

    }

    // Get autocomplete suggestions
    public List<String> autocomplete(String prefix) {

        return trie.autocomplete(prefix);

    }

    public String spellSuggestion(String word) {

        List<String> allWords = trie.autocomplete("");

        int smallestDistance = Integer.MAX_VALUE;

        String bestWord = "";

        for (String dictionaryWord : allWords) {

            int distance = EditDistance.calculate(word, dictionaryWord);

            if (distance < smallestDistance) {

                smallestDistance = distance;

                bestWord = dictionaryWord;

            }

        }

        return bestWord;

    }

    // Show search history
    public void showHistory() {

        history.showHistory();

    }

}