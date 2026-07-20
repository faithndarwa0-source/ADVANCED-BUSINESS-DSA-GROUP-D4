package benchmark;

public class BenchmarkResult {

    private String operation;
    private int dictionarySize;
    private long executionTime;

    public BenchmarkResult(String operation,
                           int dictionarySize,
                           long executionTime) {

        this.operation = operation;
        this.dictionarySize = dictionarySize;
        this.executionTime = executionTime;

    }

    @Override
    public String toString() {

        return operation +
                " | Dictionary Size: " +
                dictionarySize +
                " | Time: " +
                executionTime +
                " ns";

    }

}