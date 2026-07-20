# Intelligent Search Engine

## Overview

The Intelligent Search Engine is a Java desktop application developed as part of a Data Structures and Algorithms project. The system implements a Trie-based search engine capable of performing efficient word searches, autocomplete, spell correction using Edit Distance, and performance benchmarking. It also evaluates scalability by testing different dictionary sizes and simulated user loads.

## The project supports

- Exact word search
- Autocomplete using trie
- Spell correction usind Edit Distance
- Search history
- Dictionary loading from file

## Objectives
* Implement an efficient search engine using appropriate data structures.
* Demonstrate the use of algorithms for searching, autocomplete, and spell correction.
* Evaluate the performance of the system using benchmark tests.
* Analyse system scalability with increasing dictionary sizes and simulated users.

## Technologies
- Java
- IntelliJ IDEA
- Trie Data Structure
- Dynamic Programming
- HashMap
- ArrayDeque


## Project Structure
src/

├── algorithms/

├── datastructures/

├── engine/

├── gui/

├── testing/

├── utils/

└── Main.java

## Algorithms
- Trie
- Levenshtein Edit Distance
- Prefix Search

## Data Structures
* Trie (Primary Data Structure)
* HashMap
* HashSet
* ArrayList
* PriorityQueue

## Performance Testing
The application was benchmarked using dictionaries of different sizes:

* 1,000 entries
* 10,000 entries
* 1,000,000 entries

The following operations were measured:

* Search
* Autocomplete
* Spell Suggestions

## Scalability Testing
System scalability was evaluated by simulating:

* 1,000 users
* 10,000 users
* 1,000,000 users

The objective was to analyse how the system performs under increasing workloads while maintaining efficient search operations.

## Running
1. Open the project in IntelliJ IDEA.
2. Ensure the resources folder contains the dictionary files.
3. Run the GUI launcher (or Main class depending on the implementation).
4. Use the application to search words, view autocomplete suggestions, add new words, and perform benchmark tests.
