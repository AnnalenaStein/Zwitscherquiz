<script>
  export let title = "Vogelstimmen erraten"; // Standardtitel
  export let activePage;
  export let subtitle =
    "Lerne die Rufe verschiedener Vögel und teste dein Wissen"; // Standard-Untertitel
</script>

<header>
  <h1>{title}</h1>
  <p>{subtitle}</p>
  
  <nav class="navBar-container">
    <a href="#/auswahl" class="navBar-button" class:active={$activePage === 'Auswahl'}>Quiz</a>
    <a href="#/" class="navBar-button" class:active={$activePage === 'Home'}>Home</a>
    <a href="#/uebersicht" class="navBar-button" class:active={$activePage === 'Übersicht'}>Steckbriefe</a>
  </nav>
  
</header>

<style>
  .navBar-container {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    position: fixed; /* Standardmäßig am unteren Rand */
    bottom: 0;
    left: 0;
    padding: 16px;
    background: #a7b487;
  }

  .navBar-button {
    text-decoration: none;
    color: black;
    padding: 10px;
    border-radius: 5px;
    flex: 1;
  }
  .active {
    font-weight: bold;
    color: rgb(0, 0, 0);
  }

  .navBar-button:hover {
  color: #ffffff;
}

  @media (min-width: 768px) {
    header {
    align-items: flex-start; /* Linksbündige Ausrichtung für Elemente */
    text-align: left; /* Text nach links ausrichten */
    padding: 24px;
  }
    .navBar-container {
      position: absolute; /* Absolut relativ zum Header */
      bottom: initial;
      top: 50%;
      right: 10px;
      left: auto;
      width: auto;
      transform: translateY(-50%);
      background: transparent;
    }
  }
</style>
