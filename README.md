# Stickaufträge: GitHub-Fix, Version 6

**Diese Version braucht keinen `icons`-Ordner.** Alle Dateien liegen direkt nebeneinander. Das vorhandene App-Symbol bleibt unverändert.

## Bestehende App aktualisieren

Vorher in der bisherigen App unter **Daten → Sicherung speichern** eine Sicherung anlegen. Keine Browserdaten löschen und kein neues Repository anlegen. Die bisherige Website-Adresse beibehalten.

1. Die heruntergeladene ZIP **entpacken**. Die ZIP selbst wird nicht als App ausgeführt und beim normalen GitHub-Datei-Upload nicht automatisch entpackt.
2. Im bestehenden GitHub-Repository den Ordner öffnen, in dem die bisherige `index.html` liegt. **Add file → Upload files** auswählen.
3. Alle entpackten Dateien gemeinsam auswählen und hochladen. `index.html`, `manifest.webmanifest` und `sw.js` ersetzen die bisherigen Dateien. Die PNG-Dateien kommen **direkt daneben**, nicht in einen Unterordner. Die Änderungen im bisherigen Veröffentlichungsbranch speichern beziehungsweise dorthin übernehmen.
4. Unter **Settings → Pages** muss der Branch und Quellordner mit diesen Dateien ausgewählt sein. Bei einer bereits veröffentlichten App die funktionierende Einstellung beibehalten. Bei erstmaliger Einrichtung: **Deploy from a branch**, den Branch mit den Dateien und den passenden Ordner auswählen. Liegt `index.html` im Hauptverzeichnis, ist dies **/(root)**. Liegt sie im bisherigen `docs`-Ordner, ist es **/docs**.
5. Warten, bis die Pages-Veröffentlichung abgeschlossen ist. Dann die dort angezeigte **veröffentlichte Website** auf Android in Chrome öffnen. Nicht die GitHub-Dateiansicht, die ZIP oder die HTML-Datei aus dem Downloadordner öffnen.
6. Die Seite neu laden und **App installieren** antippen. Ohne direkten Installationsdialog zeigt die App die Installationshilfe und prüft die benötigten Dateien. Im Chrome-Menü **⋮ → App installieren** beziehungsweise **Zum Startbildschirm hinzufügen → Installieren** verwenden, sofern angeboten.

## Diese Dateien müssen nebeneinander liegen

```text
index.html
manifest.webmanifest
sw.js
icon-192-v6.png
icon-512-v6.png
icon-maskable-192-v6.png
icon-maskable-512-v6.png
apple-touch-icon.png
favicon.ico
```

`README.md` und `PRUEFUNG.md` sind zusätzliche Anleitungen. Sie dürfen ebenfalls hochgeladen werden, werden aber nicht für die App benötigt. Bereits vorhandene alte Symbole und ein alter `icons`-Ordner dürfen liegen bleiben. Version 6 verwendet sie nicht.

## Installation prüfen

Wenn kein Installationsdialog verfügbar ist, öffnet **App installieren** die Hilfe mit einer Prüfung. **Installation prüfen** wiederholt sie. Geprüft werden das aktuelle Manifest und alle vier Android-Symbole. Erreichbarkeit, PNG-Dateityp und, soweit die Browserfunktion verfügbar ist, Bildabmessungen werden geprüft. `sw.js` wird zusätzlich für die Offline-Funktion geprüft.

**HTTP 404 mit einem Dateinamen:** Genau diese Datei wurde nicht mit hochgeladen, liegt im falschen Ordner oder ist noch nicht veröffentlicht. Direkt neben `index.html` hochladen.

**Manifest nicht Version 6:** Auch `manifest.webmanifest` ersetzen. Nur `index.html` zu ersetzen reicht nicht.

**HTML statt Datei:** Die Adresse liefert eine Fehlerseite oder eine andere Seite statt der benötigten Datei. Veröffentlichungsordner und Dateinamen prüfen.

**Alle vier Android-Symbole erreichbar:** Die geprüften Dateien sind online vorhanden. Das bestätigt noch keine erfolgreiche Installation auf Android. Installation weiterhin im normalen Chrome-Browser über dessen Menü versuchen. Eine bestehende Installation kann ebenfalls erklären, weshalb kein erneuter Dialog erscheint.

**Die alte Version erscheint weiter:** Prüfen, ob die Änderungen in dem unter Pages eingestellten Branch und Ordner stehen und die Veröffentlichung abgeschlossen ist. Die veröffentlichte Website neu laden. Nicht den Website-Speicher löschen, dort liegen die Aufträge und Fotos.

## Änderungen

Alle Bildpfade zeigen direkt neben `index.html`. Die bisherigen normalen und maskierbaren Symbole liegen in 192 und 512 Pixeln unter neuen Namen vor. Manifest-ID, Startadresse und App-Scope bleiben unverändert und funktionieren mit relativen Pfaden auch in einem Projekt-Unterverzeichnis.

Der Service Worker verwendet den Dateicache `v6`. Fehlende zusätzliche Dateien lassen nicht mehr das gesamte Offline-Update scheitern. Die Installationsprüfung zeigt fehlende Android-Symbole trotzdem ausdrücklich an. Der Installationsknopf wird erst nach dem Browserereignis `appinstalled` oder im eigenständigen App-Modus als bereits installiert behandelt, nicht allein nach einer Zusage im Dialog.

Die Speicherfunktionen für Aufträge, Ordner und Fotos wurden nicht geändert. Die Cache-Bereinigung betrifft nur alte versionierte App-Dateicaches desselben Installationspfades. Sie löscht keine Auftragsdaten.

## Technische Quellen

GitHub-Datei-Upload: `https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository`

GitHub-Pages-Veröffentlichung: `https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site`

Installierbare Web-Apps: `https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable`
