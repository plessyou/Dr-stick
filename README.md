# Stickaufträge

Auftragsbuch für Stickereien. Die Speicherlogik für Aufträge, Ordner und Fotos wurde nicht verändert.

## Android-Version v5 bereitstellen

1. Zur Sicherheit in der bisherigen App **⤓ Daten → Sicherung speichern** wählen.
2. Diese ZIP entpacken und **den gesamten Inhalt** an dieselbe Stelle wie die bisherige App hochladen. Nicht nur `index.html` ersetzen. Der vollständige Ordner `icons` muss mit hochgeladen werden.
3. Die veröffentlichte **HTTPS-Adresse** in Chrome auf Android öffnen und neu laden. Eine lokale HTML-Datei, eine ZIP-Vorschau oder die Dateiansicht eines Repositorys ist keine installierbare Website.
4. **App installieren** antippen. Falls der Browser keinen direkten Installationsdialog anbietet, zeigt der Knopf eine Anleitung für das Browsermenü. Dort **App installieren** oder **Zum Startbildschirm hinzufügen → Installieren** wählen. Das Stickrahmen-Symbol sollte bereits im Dialog erscheinen.

Die Website-Adresse und der bisherige Installationspfad sollen gleich bleiben. Die ZIP-Datei selbst ist keine APK.

## Was angepasst wurde

- Die vorhandenen normalen und maskierbaren Symbole sind unter neuen Dateinamen mit `-v5.png` eingebunden. Das Motiv bleibt unverändert. Beide Varianten liegen in 192 × 192 und 512 × 512 Pixeln vor. Die maskierbaren Symbole haben einen deckenden Hintergrund und ausreichend Platz für Androids unterschiedliche Symbolformen.
- Das Manifest bleibt unter `manifest.webmanifest` erreichbar. App-ID, Name, Startadresse und Gültigkeitsbereich sind unverändert. Zusätzliche HTML-Symbolverweise verwenden ebenfalls die neuen Dateien.
- **App installieren** enthält jetzt das App-Symbol und bleibt im Android-Browser auch ohne automatisches Installationsangebot erreichbar. Die Werkzeugleiste bricht auf schmalen Bildschirmen um, statt den Knopf rechts aus dem sichtbaren Bereich zu schieben. Innerhalb der bereits gestarteten App ist der Knopf ausgeblendet.
- Der Service Worker verwendet Version 5, lädt das vollständige Dateipaket neu und prüft HTML und Manifest online auf Aktualisierungen. Seine neuen Caches sind nach Installationspfad getrennt. Die Bereinigung betrifft nur seine eigenen versionierten Caches, nicht Aufträge oder Caches anderer Apps.

## Eine vorhandene Installation zeigt noch das alte oder kein Symbol

Eine einfache Startbildschirm-Verknüpfung kann entfernt und über die oben beschriebene Installation neu angelegt werden. Dabei nur die Verknüpfung entfernen, nicht die Browser- oder Website-Daten löschen.

Bei einer bereits installierten Web-App aktualisiert Chrome das Android-Symbol nicht unbedingt sofort. Die App nach dem Hochladen einmal online öffnen und anschließend schließen. WLAN und ein angeschlossenes Ladegerät können für die Aktualisierung erforderlich sein. Die beiliegenden Dateien können das bereits auf einem Gerät gespeicherte Symbol nicht sofort ersetzen.

Vor einer eventuellen Deinstallation oder Neuinstallation immer eine Sicherung speichern. Die App selbst verändert beim Datei-Update keine gespeicherten Aufträge.

## Dateien

`index.html`, `manifest.webmanifest`, `sw.js`, `favicon.ico` und der komplette Ordner `icons` gehören zusammen. Die ursprünglichen Symboldateien ohne `-v5` bleiben zur Kompatibilität mit älteren Verweisen enthalten. `README.md` und `PRUEFUNG.md` sind Dokumentation und nicht für die Ausführung erforderlich.

Der Webserver muss echte PNG-Dateien unter den Symboladressen und JSON unter `manifest.webmanifest` liefern, keine HTML-Fehlerseite oder Anmeldung. Für das Manifest ist `application/manifest+json`, für die Symbole `image/png` als Content-Type vorgesehen.

## Weitere Updates

Bei Änderungen an den App-Dateien `APP_VERSION` in `sw.js` und `sw.js?v=5` in `index.html` gemeinsam erhöhen. Bei einem neuen Symbol neue versionierte PNG-Dateien anlegen und deren Verweise in Manifest, HTML und `APP_SHELL` aktualisieren. Den Namen und Pfad der Manifestdatei beibehalten.

## Technische Quellen

Installationsvoraussetzungen: `https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable`

Android-Symbolformen und Sicherheitsbereich: `https://web.dev/articles/maskable-icon`

Aktualisierung bestehender Installationen: `https://web.dev/articles/manifest-updates`
