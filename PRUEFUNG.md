# Prüfung der Android-Anpassung

## Bestanden

**Dateien:** Manifest-JSON und JavaScript-Syntax geprüft. Alle statischen Symbolverweise zeigen auf vorhandene Dateien. Größen und PNG-Format stimmen mit dem Manifest überein. Normale und maskierbare Varianten sind getrennt eingetragen. Das kontrastreiche Motiv der maskierbaren Dateien liegt innerhalb des kreisförmigen Sicherheitsbereichs. Die Bilddateien sind unveränderte Kopien des vorhandenen Motivs unter neuen Namen.

**Pfade:** Relative Manifest-, Start- und Symboladressen für eine Installation im Website-Hauptverzeichnis und in einem Unterverzeichnis geprüft. App-ID, Name, Startadresse und Gültigkeitsbereich sind gegenüber dem Original unverändert.

**Oberfläche:** Mit Chromium 144, Android-Browserkennung und Bildschirmbreiten von 320, 393 und 600 CSS-Pixeln geprüft. Der Installationsknopf samt geladenem Symbol ist vollständig sichtbar. In der Ausgangsversion lag der eingeblendete Knopf bei 393 Pixeln überwiegend außerhalb des sichtbaren Bereichs. Die angepasste Seite hat in den geprüften Breiten keinen horizontalen Seitenüberlauf.

**Installationslogik:** Hilfedialog ohne Installationsangebot, abgelehnter Dialog, angenommener Dialog, Fehler beim Öffnen des Dialogs und das Ereignis `appinstalled` mit simulierten Browserereignissen geprüft. Der Knopf ist im simulierten eigenständigen App-Modus ausgeblendet. Gespeicherte Testaufträge, Ordner, Fotodaten und ein fremder Speichereintrag blieben bei diesen Abläufen unverändert.

**Service Worker:** In einer isolierten JavaScript-Testumgebung geprüft: vollständiges Vorladen mit Umgehung alter HTTP-Cache-Kopien, Bereinigung nur eigener Caches, frisches Manifest, Offline-Rückfall für HTML und Symbole, Rückfall bei Serverfehlern, fehlende Dateien beim Update, fehlender Speicherplatz und Behandlung fremder Anfragen. Die Tests liefen sowohl für den Website-Hauptpfad als auch für ein Unterverzeichnis.

## Grenzen der Prüfung

Die Oberflächentests verwendeten ein isoliertes Browserdokument mit eingebetteten Testbildern und simuliertem Speicher. Netzwerk, Cache und Installationsdialoge wurden für die Logiktests simuliert. Eine vollständige Installation über eine veröffentlichte HTTPS-Adresse, die Android-WebAPK-Erstellung und die Darstellung im Startbildschirm eines echten Android-Geräts wurden nicht getestet. Die konkrete Ursache des fehlenden Symbols auf dem bisherigen Gerät ist ohne Zugriff auf dessen Installation und die veröffentlichte Website nicht abschließend feststellbar.
