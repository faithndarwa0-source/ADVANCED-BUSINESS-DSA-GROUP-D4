package engine;

public class WordSuggestion implements Comparable<WordSuggestion> {

    private String word;
    private int distance;
    private int frequency;

    public WordSuggestion(String word, int distance, int frequency) {
        this.word = word;
        this.distance = distance;
        this.frequency = frequency;
    }

    public String getWord() {
        return word;
    }

    public int getDistance() {
        return distance;
    }

    public int getFrequency() {
        return frequency;
    }

    @Override
    public int compareTo(WordSuggestion other) {

        // Smaller edit distance comes first
        if (this.distance != other.distance) {
            return Integer.compare(this.distance, other.distance);
        }

        // If edit distances are equal,
        // higher frequency comes first
        return Integer.compare(other.frequency, this.frequency);

    }

}