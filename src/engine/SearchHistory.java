package engine;

import java.util.ArrayDeque;

public class SearchHistory {

    private ArrayDeque<String> history;

    public SearchHistory() {

        history = new ArrayDeque<>();

    }

    public void addSearch(String word) {

        history.push(word);

    }

    public void showHistory() {

        for (String word : history) {

            System.out.println(word);

        }

    }

    public String[] getHistory() {

        return history.toArray(new String[0]);

    }

}