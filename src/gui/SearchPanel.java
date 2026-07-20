package gui;

import engine.SearchEngine;

import javax.swing.*;
import java.awt.*;
import javax.swing.event.DocumentEvent;
import javax.swing.event.DocumentListener;
import java.util.List;

public class SearchPanel extends JPanel {

    private SearchEngine engine;

    private JTextField searchField;

    private JButton searchButton;

    private JButton addButton;

    private JButton clearButton;

    private JLabel statusLabel;

    private JList<String> autocompleteList;

    private JList<String> suggestionList;

    private JList<String> historyList;

    public SearchPanel(SearchEngine engine) {

        this.engine = engine;

        setLayout(new BorderLayout(15,15));

        setBorder(BorderFactory.createEmptyBorder(15,15,15,15));

        // Background color
        setBackground(new Color(245, 247, 250));

        //-------------------- TITLE ------------------------

        JLabel title = new JLabel(
                "INTELLIGENT SEARCH ENGINE",
                SwingConstants.CENTER
        );

        title.setFont(new Font("Segoe UI", Font.BOLD, 30));

        title.setForeground(new Color(25, 70, 150));

        title.setBorder(BorderFactory.createEmptyBorder(10,0,20,0));

        add(title, BorderLayout.NORTH);

        //-------------------- CENTER -----------------------

        JPanel centerPanel = new JPanel();

        centerPanel.setLayout(new BoxLayout(centerPanel, BoxLayout.Y_AXIS));

        add(centerPanel, BorderLayout.CENTER);

        //---------------- SEARCH INPUT ---------------------

        centerPanel.add(new JLabel("Search Word"));

        searchField = new JTextField();

        centerPanel.add(searchField);

        centerPanel.add(Box.createVerticalStrut(10));

        //---------------- BUTTONS --------------------------

        JPanel buttonPanel = new JPanel(new FlowLayout());

        searchButton = new JButton("Search");

        addButton = new JButton("Add Word");

        clearButton = new JButton("Clear");

        Color buttonBlue = new Color(33,150,243);

        searchButton.setBackground(buttonBlue);
        addButton.setBackground(buttonBlue);
        clearButton.setBackground(buttonBlue);

        searchButton.setForeground(Color.WHITE);
        addButton.setForeground(Color.WHITE);
        clearButton.setForeground(Color.WHITE);

        searchButton.setFocusPainted(false);
        addButton.setFocusPainted(false);
        clearButton.setFocusPainted(false);

        searchButton.setFont(new Font("Segoe UI", Font.BOLD,14));
        addButton.setFont(new Font("Segoe UI", Font.BOLD,14));
        clearButton.setFont(new Font("Segoe UI", Font.BOLD,14));

        buttonPanel.add(searchButton);

        buttonPanel.add(addButton);

        buttonPanel.add(clearButton);

        centerPanel.add(buttonPanel);

        //---------------- STATUS ---------------------------

        statusLabel = new JLabel("Ready.");

        statusLabel.setFont(
                new Font("Segoe UI",Font.BOLD,14)
        );

        statusLabel.setForeground(
                new Color(80,80,80)
        );

        centerPanel.add(statusLabel);

        centerPanel.add(Box.createVerticalStrut(15));

        //---------------- AUTOCOMPLETE ---------------------

        centerPanel.add(new JLabel("Autocomplete"));

        autocompleteList = new JList<>();

        centerPanel.add(new JScrollPane(autocompleteList));

        centerPanel.add(Box.createVerticalStrut(15));

        //---------------- SPELL ----------------------------

        centerPanel.add(new JLabel("Spell Suggestions"));

        suggestionList = new JList<>();

        centerPanel.add(new JScrollPane(suggestionList));

        centerPanel.add(Box.createVerticalStrut(15));

        //---------------- HISTORY --------------------------

        centerPanel.add(new JLabel("Search History"));

        historyList = new JList<>();

        centerPanel.add(new JScrollPane(historyList));

        searchField.getDocument().addDocumentListener(new DocumentListener() {

            @Override
            public void insertUpdate(DocumentEvent e) {

                updateAutocomplete();

            }

            @Override
            public void removeUpdate(DocumentEvent e) {

                updateAutocomplete();

            }

            @Override
            public void changedUpdate(DocumentEvent e) {

                updateAutocomplete();

            }

        });


                searchButton.addActionListener(e -> performSearch());

        addButton.addActionListener(e -> addWord());

        clearButton.addActionListener(e -> clearScreen());





    }

    private void updateAutocomplete() {

        String prefix = searchField.getText().trim();

        if (prefix.isEmpty()) {

            autocompleteList.setListData(new String[0]);

            return;

        }

        List<String> suggestions = engine.autocomplete(prefix);

        autocompleteList.setListData(

                suggestions.toArray(new String[0])

        );

    }

    private void addWord() {

        String word = searchField.getText().trim();

        if (word.isEmpty()) {

            statusLabel.setForeground(new Color(255,215,0));

            statusLabel.setText("Please enter a word.");


            return;

        }

        if (engine.addWord(word)) {

            statusLabel.setForeground(
                    new Color(34,139,34)
            );

            statusLabel.setText("✓ Word Added Successfully");

        } else {

            statusLabel.setForeground(
                    new Color(255,140,0)
            );

            statusLabel.setText("Word Already Exists");

        }

        updateAutocomplete();

    }

    private void clearScreen() {

        searchField.setText("");



        statusLabel.setText("Ready.");

        autocompleteList.setListData(new String[0]);

        suggestionList.setListData(new String[0]);

        historyList.setListData(new String[0]);

    }


    private void performSearch() {

        String word = searchField.getText().trim();

        if (word.isEmpty()) {

            statusLabel.setText("Please enter a word.");

            return;

        }

        if (engine.searchWord(word)) {

            statusLabel.setForeground(
                    new Color(34,139,34)
            );

            statusLabel.setText("✓ Word Found");

            suggestionList.setListData(new String[0]);

        } else {

            statusLabel.setForeground(Color.RED);

            statusLabel.setText("✗ Word Not Found");

            suggestionList.setListData(
                    engine.spellSuggestions(word).toArray(new String[0])
            );

        }

        historyList.setListData(engine.getSearchHistory());

    }

}