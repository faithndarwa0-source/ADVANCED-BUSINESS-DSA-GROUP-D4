package engine;

import java.util.ArrayDeque;
import java.util.Deque;

public class SearchHistory {

    private Deque<String> history;

    public SearchHistory() {

        history = new ArrayDeque<>();

    }

    public void addSearch(String word) {

        history.push(word);

    }

    public void showHistory() {

        System.out.println("Recent Searches:");

        for (String word : history) {

            System.out.println(word);

        }

    }

}