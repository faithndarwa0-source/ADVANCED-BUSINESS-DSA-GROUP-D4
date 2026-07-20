import engine.SearchEngine;
import gui.MainWindow;

import javax.swing.SwingUtilities;

public class GuiLauncher {

    public static void main(String[] args) {

        SearchEngine engine = new SearchEngine();

        SwingUtilities.invokeLater(() -> {

            new MainWindow(engine);

        });

    }

}