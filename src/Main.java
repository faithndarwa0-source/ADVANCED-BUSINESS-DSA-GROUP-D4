import engine.SearchEngine;

public class Main {

    public static void main(String[] args) {

        SearchEngine engine = new SearchEngine();

        System.out.println("Search for algorithm");

        System.out.println(engine.searchWord("algorithm"));

        System.out.println();

        System.out.println("Spell Suggestion:");

        System.out.println(

                engine.spellSuggestion("algoritm")

        );

        System.out.println();

        System.out.println("Autocomplete:");

        System.out.println(engine.autocomplete("alg"));

        System.out.println();

        engine.showHistory();

    }

}