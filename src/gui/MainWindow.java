package gui;

import engine.SearchEngine;

import javax.swing.*;
import java.awt.*;

public class MainWindow extends JFrame {

    private SearchEngine engine;

    public MainWindow(SearchEngine engine) {

        this.engine = engine;

        setTitle("Intelligent Search Engine");

        setSize(900,650);

        setLocationRelativeTo(null);

        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        setLayout(new BorderLayout());

        add(new SearchPanel(engine), BorderLayout.CENTER);

        setVisible(true);

    }

}