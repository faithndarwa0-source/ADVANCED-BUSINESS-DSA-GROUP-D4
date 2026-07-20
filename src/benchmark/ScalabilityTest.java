package benchmark;

import engine.SearchEngine;

public class ScalabilityTest {

    public static void runTest(String dictionaryFile,
                               int dictionarySize,
                               int simulatedUsers) {

        SearchEngine engine = new SearchEngine(dictionaryFile);

        double searchTime =
                BenchmarkRunner.benchmarkSearch(engine, "algorithm");

        double autoTime =
                BenchmarkRunner.benchmarkAutocomplete(engine, "alg");

        double spellTime =
                BenchmarkRunner.benchmarkSpell(engine, "algoritm");

        long userTime =
                UserLoadSimulator.simulateUsers(
                        engine,
                        simulatedUsers,
                        "algorithm"
                );

        double average =
                (double) userTime / simulatedUsers;

        System.out.println();
        System.out.println("=================================================");
        System.out.println("             PERFORMANCE REPORT");
        System.out.println("=================================================");

        System.out.println("Dictionary Entries : " + dictionarySize);
        System.out.println("Simulated Users    : " + simulatedUsers);

        System.out.println();

        System.out.printf("Search Time        : %.6f ms%n", searchTime);
        System.out.printf("Autocomplete Time  : %.6f ms%n", autoTime);
        System.out.printf("Spell Suggestion   : %.6f ms%n", spellTime);

        System.out.println();

        System.out.println("Total User Time    : " + userTime + " ns");
        System.out.printf("Average Search     : %.2f ns%n", average);

        System.out.println("=================================================");
    }

}