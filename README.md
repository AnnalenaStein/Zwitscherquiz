# Zwitscherquiz - Vogelquiz und Steckbriefe

## Über das Projekt

Das “Zwitscherquiz” ist eine interaktive Webanwendung, in welcher die Nutzer verschiedene Vogelarten anhand von Gesangsaufnahmen erkennen können. Die Anwendung bietet das Quiz in verschiedenen Kategorien und Steckbriefe zu verschiedenen Vogelarten.

## Technologien / API’s

Dieses Projekt wurde mit folgenden Technologien umgesetzt:

- **Xeno-Canto API**: Abruf von Vogelstimmen
- **Pixabay API**: Laden von Vogelbildern
- **WIkipedia API:** Laden von Vogelbildern und Exzerpten
- **JSON-Datenstruktur**: Speicherung der Vogelinformationen

## Funktionen

- **Startseite**: Übersicht der Funktionen (Quiz, Steckbriefe, Vogel des Tages)
- **Quiz**: Errate Vögel anhand ihrer Gesänge
    - Davor kann für das Quiz aus verschiedenen Kategorien ausgewählt werden: Gruppen von Vögeln wie Wasservögel, Greifvögel, Gartenvögel etc.
- **Steckbriefe**: Informationen zu jeder Vogelart und ihre Gesänge aufgeteilt in verschiedene Gesangsarten
- **Vogel des Tages**: Ein zufälliger Vogel mit Beschreibung

## Installation & Setup

1. Repository klonen:
   
    git clone <repository-url>
    cd zwitscherquiz

    
3. Abhängigkeiten installieren:

    npm install
    
    
4. Lokalen Entwicklungsserver starten:
    
    npm run dev
    
    
5. Die Anwendung ist nun unter `http://localhost:5173/` erreichbar.

## Nutzung

### Quiz

1. Wähle eine Vogel-Kategorie
2. Höre dir eine Aufnahme an
3. Wähle den richtigen Vogel aus
4. Wiederhole dies für 10 Fragen und erhalte die Prozentzahl an richtigen Antworten

### Steckbriefe

- Wähle einen Vogel aus der Liste
- Lies Informationen zur Art, einschließlich Name, lateinischer Name und höre dir Aufnahmen von verschiedenen Gesangstypen an

### Vogel des Tages

- Sieh dir den Vogel des Tages auf der Startseite an
- Gehe zum Steckbrief um mehr über den Vogel zu erfahren

-> Hab Spass mit dem Zwitscherquiz
