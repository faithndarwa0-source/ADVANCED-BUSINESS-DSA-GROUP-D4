package benchmark;

import engine.SearchEngine;

public class BenchmarkRunner {

    public static double benchmarkSearch(SearchEngine engine, String word) {

        long startTime = System.nanoTime();

        engine.benchmarkSearch(word);

        long endTime = System.nanoTime();

        return (endTime - startTime) / 1_000_000.0;

    }

    public static double benchmarkAutocomplete(SearchEngine engine, String prefix) {

        long startTime = System.nanoTime();

        engine.autocomplete(prefix);

        long endTime = System.nanoTime();

        return (endTime - startTime) / 1_000_000.0;

    }

    public static double benchmarkSpell(SearchEngine engine, String word) {

        long startTime = System.nanoTime();

        engine.spellSuggestions(word);

        long endTime = System.nanoTime();

        return (endTime - startTime) / 1_000_000.0;

    }

    public static void printResults(SearchEngine engine, int dictionarySize) {

        double search =
                benchmarkSearch(engine, "algorithm");

        double auto =
                benchmarkAutocomplete(engine, "alg");

        double spell =
                benchmarkSpell(engine, "algoritm");

        System.out.println();
        System.out.println("========================================================");
        System.out.println(" DICTIONARY SIZE : " + dictionarySize);
        System.out.println("========================================================");
        System.out.printf("%-22s %-15s%n", "Operation", "Time (ms)");
        System.out.println("--------------------------------------------------------");
        System.out.printf("%-22s %-15.6f%n", "Search", search);
        System.out.printf("%-22s %-15.6f%n", "Autocomplete", auto);
        System.out.printf("%-22s %-15.6f%n", "Spell Suggestion", spell);
        System.out.println("========================================================");

    }

}