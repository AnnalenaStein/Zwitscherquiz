<script>
    import Header from "../components/Header.svelte";
    import Footer from "../components/Footer.svelte";
  </script>
  
  <Header title="Impressum" subtitle="" />
  
  <main class="impressum-container">
    <!-- <h1>Impressum</h1> -->
    
    <p><strong>Kontakt:</strong> <br />
        Annalena Stein <br />
      E-Mail: <a href="annalena.stein@hfg-gmuend.de">annalena.stein@hfg-gmuend.de</a><br />
      <!-- Telefon: +49 123 456789 -->
    </p>

    <p> <strong>Projektinformation</strong> <br />
        Das "Zwitscherquiz" ist ein Projekt im 3. Semester an der Hochschule für Gestaltung in Schwäbisch Gmünd, entwickelt im Rahmen des Kurses  Programmiersprachen 3. Das Projekt dient ausschließlich Bildungszwecken und verfolgt keine kommerziellen Absichten.
        
        </p>

    <p> <strong>Externe Dienste & APIs:</strong> <br />
        Diese Website nutzt die folgenden externen Dienste: <br />
        
        <strong> - Pixabay API für Bildersuche </strong> <br />
          Anbieter: Canva Pty Ltd, Sydney, Australien <br />
          Website: https://pixabay.com/ <br />
        
          <strong> - Xeno-Canto API für Vogelstimmen-Aufnahmen </strong><br />
          Anbieter: Xeno-Canto Foundation <br />
          Website: https://xeno-canto.org/ <br />

          <strong>Wikipedia API für Bilder und Exzerpte</strong> <br />
        Anbieter: Wikimedia Foundation<br />
        Lizenz: Creative Commons Attribution-ShareAlike License (CC BY-SA 3.0)<br />
        Website: https://www.wikipedia.org<br />
    </p>

    <!-- <p><strong>Vertretungsberechtigter:</strong></p>
    <p>Max Mustermann (Geschäftsführer)</p>
  
    <p><strong>Handelsregister:</strong></p>
    <p>Amtsgericht Musterstadt <br /> Handelsregister-Nummer: HRB 12345</p>
  
    <p><strong>Umsatzsteuer-ID:</strong></p>
    <p>USt-IdNr.: DE123456789</p>
  
    <p><strong>Online-Streitbeilegung:</strong></p>
    <p>
      Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
      <a href="https://ec.europa.eu/consumers/odr" target="_blank">https://ec.europa.eu/consumers/odr</a>.
    </p> -->
  </main>
  
  <Footer />
  
  <style>
    .impressum-container {
      max-width: 800px;
      margin: 0 auto;
      line-height: 1.6;
      padding: 112px 24px 80px 24px;
      gap: 16px;
    }
  
    a {
      color: #007bff;
      text-decoration: none;
    }
  
    a:hover {
      text-decoration: underline;
    }

  </style>
  