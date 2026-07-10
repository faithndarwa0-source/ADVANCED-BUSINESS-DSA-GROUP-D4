package datastructures;

public class Trie {
    private TrieNode root;
    public Trie(){
        root = new TrieNode();
    }


    public void insert(String word) {

        TrieNode current = root;

        for (char c : word.toCharArray()) {

            current.children.putIfAbsent(c, new TrieNode());

            current = current.children.get(c);

        }

        current.endOfWord = true;

    }


    public boolean search(String word) {

        TrieNode current = root;

        for (char c : word.toCharArray()) {

            if (!current.children.containsKey(c)) {

                return false;

            }

            current = current.children.get(c);

        }

        return current.endOfWord;

    }

    private TrieNode getPrefixNode(String prefix) {

        TrieNode current = root;

        for (char c : prefix.toCharArray()) {

            if (!current.children.containsKey(c)) {

                return null;

            }

            current = current.children.get(c);

        }

        return current;

    }

    private void collectWords(TrieNode node, String currentWord,
                              java.util.List<String> suggestions) {

        if (node.endOfWord) {

            suggestions.add(currentWord);

        }

        for (Character c : node.children.keySet()) {

            collectWords(

                    node.children.get(c),

                    currentWord + c,

                    suggestions

            );

        }

    }

    public java.util.List<String> autocomplete(String prefix) {

        java.util.List<String> suggestions = new java.util.ArrayList<>();

        TrieNode node = getPrefixNode(prefix);

        if (node == null) {

            return suggestions;

        }

        collectWords(node, prefix, suggestions);

        return suggestions;

    }


}
