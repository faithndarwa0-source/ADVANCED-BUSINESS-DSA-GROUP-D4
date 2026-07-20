package benchmark;

import engine.SearchEngine;

public class UserLoadSimulator {

    public static long simulateUsers(SearchEngine engine,
                                     int users,
                                     String searchWord) {

        long startTime = System.nanoTime();

        for (int i = 0; i < users; i++) {

            engine.benchmarkSearch(searchWord);

        }

        long endTime = System.nanoTime();

        return endTime - startTime;

    }

}