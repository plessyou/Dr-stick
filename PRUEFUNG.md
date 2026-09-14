# Prüfung von Version 6

## Bestanden

Alle statischen HTML-Verweise und Manifest-Symbole zeigen auf vorhandene Dateien. PNG-Formate und die im Manifest angegebenen Bildgrößen sind geprüft. Die normalen und maskierbaren Bilder sind unveränderte Kopien der vorherigen Version. JavaScript-Syntax von App und Service Worker ist geprüft. Im ZIP gibt es keine Unterordner. Die Speicherfunktionen der bisherigen App sind unverändert.

13 isolierte JavaScript-Testfälle wurden mit Node.js ausgeführt. Die Service-Worker-Tests simulieren Browserereignisse, Netzwerkantworten und Cache-Speicher für Hauptverzeichnis und Projekt-Unterverzeichnis. Geprüft wurden Vorladen, Offline-Rückfall, Serverfehler, Bereinigung nur eigener Caches, fehlende Zusatzdateien, fehlende Startseite und das Umgehen von Offline-Kopien bei der Upload-Diagnose. Die Installationstests prüfen erfolgreiche Dateiprüfung, fehlendes Symbol, falsche Serverantwort, ungültiges oder altes Manifest, fehlenden Service Worker, fehlendes HTTPS, Offline-Status und Installationsereignisse. Eine Zusage im Dialog gilt nicht vorzeitig als bestätigte Installation.

Die Oberfläche wurde in Chromium 144 bei 320, 393 und 600 CSS-Pixeln im Speicher gerendert, mit Android-Browserkennung und eingebetteten Testkopien der Bilder. Der Installationsknopf und das Symbol sind sichtbar; die Seite hat keinen horizontalen Überlauf. Hilfedialog und Schließen funktionieren. Die Diagnose meldet eine nicht veröffentlichte Seite korrekt. Testeinträge für Aufträge, Ordner und Fotos im simulierten Speicher bleiben unverändert.

## Nicht bestätigt

Ein vollständiger Browser-Test über einen lokalen HTTP-Server wurde durch die Testumgebung mit `ERR_BLOCKED_BY_ADMINISTRATOR` blockiert. Daher konnten Manifest-Erkennung und Service-Worker-Aktivierung nicht in einem realen Netzwerkablauf geprüft werden. Die genannten Logiktests verwenden kontrollierte Testantworten und ersetzen diesen Test nicht.

Die konkrete veröffentlichte GitHub-Pages-Adresse wurde nicht geprüft. Eine echte Installation auf Android, die WebAPK-Erstellung und das Symbol im Android-Launcher wurden nicht getestet. Die bereitgestellte ZIP korrigiert die Dateistruktur und Fehlerbehandlung, stellt aber keinen Nachweis einer erfolgreichen Installation auf dem Gerät dar.
