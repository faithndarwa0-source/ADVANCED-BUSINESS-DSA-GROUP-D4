package engine;

import datastructures.Trie;
import utils.DictionaryLoader;
import java.util.PriorityQueue;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import algorithms.EditDistance;

public class SearchEngine {

    private Trie trie;
    private SearchHistory history;

    // Supporting Data Structures
    private HashMap<String, Integer> wordFrequency;
    private HashSet<String> dictionarySet;
    private ArrayList<String> dictionaryWords;
    private PriorityQueue<WordSuggestion> rankingQueue;

    public SearchEngine() {

        this("resources/dictionary.txt");

    }

    public SearchEngine(String dictionaryFile) {

        trie = new Trie();
        history = new SearchHistory();

        wordFrequency = new HashMap<>();
        dictionarySet = new HashSet<>();
        dictionaryWords = new ArrayList<>();

        rankingQueue = new PriorityQueue<>();

        loadDictionary(dictionaryFile);

    }

    // Load dictionary into all data structures
    private void loadDictionary(String dictionaryFile) {

        DictionaryLoader.loadDictionary(
                dictionaryFile,
                trie,
                dictionaryWords,
                dictionarySet,
                wordFrequency
        );

    }

    // Search for a word
    public boolean searchWord(String word) {

        word = word.toLowerCase().trim();

        history.addSearch(word);

        if (trie.search(word)) {

            wordFrequency.put(
                    word,
                    wordFrequency.getOrDefault(word, 0) + 1
            );

            return true;
        }

        return false;

    }

    // Benchmark search (used only for performance testing)
    public boolean benchmarkSearch(String word) {

        word = word.toLowerCase().trim();

        return trie.search(word);

    }

    // Autocomplete
    public List<String> autocomplete(String prefix) {

        return trie.autocomplete(prefix.toLowerCase());

    }

    // Add a new word
    public boolean addWord(String word) {

        word = word.toLowerCase().trim();

        if (dictionarySet.contains(word)) {
            return false;
        }

        trie.insert(word);

        dictionarySet.add(word);

        dictionaryWords.add(word);

        wordFrequency.put(word, 0);

        return true;

    }

    // Select likely candidate words before applying Edit Distance
    private List<String> getCandidateWords(String word) {

        List<String> candidates = new ArrayList<>();

        char firstLetter = word.charAt(0);

        for (String dictionaryWord : dictionaryWords) {

            if (dictionaryWord.charAt(0) == firstLetter) {

                candidates.add(dictionaryWord);

            }

        }

        return candidates;

    }

    public List<String> spellSuggestions(String word) {

        rankingQueue.clear();

        word = word.toLowerCase().trim();

        List<String> candidates = getCandidateWords(word);

        for (String dictionaryWord : candidates) {

            int distance =
                    EditDistance.calculate(word, dictionaryWord);

            int frequency =
                    wordFrequency.getOrDefault(dictionaryWord, 0);

            rankingQueue.offer(

                    new WordSuggestion(
                            dictionaryWord,
                            distance,
                            frequency
                    )

            );

        }

        List<String> suggestions = new ArrayList<>();

        int limit = 5;

        while (!rankingQueue.isEmpty() && limit > 0) {

            suggestions.add(

                    rankingQueue.poll().getWord()

            );

            limit--;

        }

        return suggestions;

    }

    // Display search history
    public void showHistory() {

        history.showHistory();

    }

    // Get search frequency
    public int getSearchFrequency(String word) {

        return wordFrequency.getOrDefault(word.toLowerCase(), 0);

    }

    // Return all dictionary words
    public ArrayList<String> getDictionaryWords() {

        return dictionaryWords;

    }

    public String[] getSearchHistory() {

        return history.getHistory();

    }

}