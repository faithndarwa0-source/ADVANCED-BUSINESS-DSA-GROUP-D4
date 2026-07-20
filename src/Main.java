import engine.SearchEngine;

import benchmark.Dictionarygenerator;

import benchmark.BenchmarkRunner;

import benchmark.UserLoadSimulator;

import benchmark.ScalabilityTest;

public class Main {

    public static void main(String[] args) {
        Dictionarygenerator.generateDictionary(
                "resources/test1000.txt",
                1000
        );

        Dictionarygenerator.generateDictionary(
                "resources/test10000.txt",
                10000
        );

        Dictionarygenerator.generateDictionary(
                "resources/test1000000.txt",
                1000000
        );

        ScalabilityTest.runTest(
                "resources/test1000.txt",
                1000,
                1000
        );

        ScalabilityTest.runTest(
                "resources/test10000.txt",
                10000,
                10000
        );

        ScalabilityTest.runTest(
                "resources/test1000000.txt",
                1000000,
                1000000
        );



        SearchEngine engine = new SearchEngine();



        System.out.println("====================================");
        System.out.println(" INTELLIGENT SEARCH ENGINE (D4)");
        System.out.println("====================================");

        // 1. Search for an existing word
        System.out.println("\n1. Searching for 'algorithm'...");

        if (engine.searchWord("algorithm")) {
            System.out.println("Word Found.");
        } else {
            System.out.println("Word Not Found.");
        }

        // 2. Search for a misspelled word
        System.out.println("\n2. Searching for 'algoritm'...");

        if (engine.searchWord("algoritm")) {

            System.out.println("Word Found.");

        } else {

            System.out.println("Word Not Found.");
            System.out.println("Suggestions:");
            System.out.println(engine.spellSuggestions("algoritm"));

        }

        // 3. Autocomplete
        System.out.println("\n3. Autocomplete for 'alg':");

        System.out.println(engine.autocomplete("alg"));

        // 4. Add a new word
        System.out.println("\n4. Adding word 'compiler'...");

        if (engine.addWord("compiler")) {

            System.out.println("Word added successfully.");

        } else {

            System.out.println("Word already exists.");

        }

        // 5. Search the newly added word
        System.out.println("\n5. Searching for 'compiler'...");

        if (engine.searchWord("compiler")) {

            System.out.println("Word Found.");

        } else {

            System.out.println("Word Not Found.");

        }

        // 6. Autocomplete again
        System.out.println("\n6. Autocomplete for 'comp':");

        System.out.println(engine.autocomplete("comp"));

        // 7. Search frequency
        System.out.println("\n7. Search frequency of 'algorithm':");

        System.out.println(engine.getSearchFrequency("algorithm"));

        // 8. Search history
        System.out.println("\n8. Search History:");

        engine.showHistory();

        System.out.println("\n====================================");
        System.out.println("End of Demonstration");
        System.out.println("====================================");

        System.out.println("\nRunning User Load Simulations...\n");


    }
}