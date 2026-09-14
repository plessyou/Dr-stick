# Stickaufträge

Auftragsbuch für Stickereien – läuft komplett im Browser, alle Daten bleiben auf dem Gerät.

## Inhalt

| Datei | Wozu |
|---|---|
| `index.html` | die App |
| `manifest.webmanifest` | macht sie auf Android als echte App installierbar |
| `sw.js` | Offline-Betrieb und saubere Updates |
| `favicon.ico` | Symbol im Browser-Tab |
| `icons/icon-192.png`, `icons/icon-512.png` | App-Symbol |
| `icons/icon-maskable-*.png` | Symbol für Androids eigene Formen (rund, Squircle …) |
| `icons/apple-touch-icon.png` | Symbol für iPhone und iPad |
| `icons/favicon-16.png`, `icons/favicon-32.png` | kleine Browser-Symbole |

Die Ordnerstruktur muss genau so bleiben, sonst findet die App ihre Symbole nicht.

## Auf Android als echte App installieren

1. Adresse in **Chrome** öffnen.
2. Eine alte Verknüpfung mit Chrome-Abzeichen vorher vom Startbildschirm entfernen.
3. Dreipunktmenü → **Zum Startbildschirm hinzufügen** oder **App installieren**.
4. Erscheint ein Dialog mit zwei Möglichkeiten: **Installieren** wählen, *nicht* „Verknüpfung erstellen“.

Danach steht die App in der App-Übersicht wie jede andere, startet im Vollbild
ohne Adressleiste und trägt kein Chrome-Abzeichen mehr.

## Nach einer Änderung

1. In `sw.js` die Zeile `const CACHE_NAME = "stickauftraege-v4";` hochzählen, etwa auf `"stickauftraege-v5"`.
2. In `index.html` die Stelle `sw.js?v=4` auf dieselbe Zahl setzen.
3. Geänderte Dateien ins Repository hochladen.

Gespeicherte Aufträge bleiben dabei erhalten.

## Daten sichern

In der App auf **⤓ Daten → Sicherung speichern**. Die JSON-Datei enthält Aufträge,
Ordner und Fotos. Über **Sicherung laden** kommt alles auf einem anderen Gerät
wieder hinein. Mach das regelmäßig – der Browser-Speicher ist die einzige Kopie.
