<script>
  export let activePage; //Um aktuelle Seite zu highlighten
</script>

<!-- <nav class="navBar-container">
  <a href="/auswahl" class="navBar-button {activePage === 'Auswahl' ? 'active' : ''}">Quiz</a>
  <a href="/" class="navBar-button {activePage === 'Home' ? 'active' : ''}">Home</a>
  <a href="/uebersicht" class="navBar-button {activePage === 'Übersicht' ? 'active' : ''}">Steckbriefe</a>
</nav> -->


<style>
  .navBar-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: #a7b487;
    box-sizing: border-box;
    color: white;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 1000;
    padding: 100px 100px;

  }

  .navBar-button {
    text-decoration: none;
    color: black;
    padding: 10px;
    border-radius: 5px;
    flex: 1;
    text-align: center;
  }

  .navBar-button:hover {
    background: #c7d4a7;
    color: white;
    font-weight: bold;
  }

  .navBar-button:active, .navBar-button.active {
  background: #c3e5b8;  /* Heller Grün für Active */
  color: white;
}

/* Definiere .active, falls nicht schon geschehen */
.navBar-button.active {
  background: #c3e5b8;
  color: white;
}

  @media (min-width: 768px) {
    .navBar-container {
      display: none;
    
    }
  }
</style>