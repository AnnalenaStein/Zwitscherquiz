<script>
  import axios from "axios";
  import { onMount, onDestroy } from "svelte";
  import Router from "svelte-spa-router";
  import Home from "./pages/Home.svelte"; // Startseite
  import Recordings from "./pages/Recordings.svelte"; // Seite für Audioaufnahmen
  import Quiz from "./pages/Quiz.svelte"; // Seite für Audioaufnahmen
  import Auswahl from "./pages/Auswahl.svelte"; // Seite für Auswahl vor Quiz
  import NavBar from "./components/NavBar.svelte";
  import Übersicht from "./pages/Übersicht.svelte";
  import Steckbrief from "./pages/Steckbrief.svelte";
  import Header from "./components/Header.svelte";
  import Impressum from "./Footer/Impressum.svelte";

  let activePage = "Home";

  const routes = {
    "/": Home,
    "/quiz": Quiz,
    "/auswahl": Auswahl,
    "/uebersicht": Übersicht,
    "/steckbrief/:name": Steckbrief,
    "/impressum": Impressum,

  };

   // Aktualisierung von `activePage` bei Routenwechsel
   function updateActivePage(route) {
    if (!route) return;
    if (route === "/") activePage = "Home";
    else if (route === "/quiz") activePage = "Quiz";
    else if (route === "/auswahl") activePage = "Auswahl";
    else if (route === "/uebersicht") activePage = "Übersicht";
    else if (route.startsWith("/steckbrief/")) activePage = "Steckbrief";
    else if (route === "/impressum") activePage = "Impressum";
  }

  // Event für Routenwechsel abonnieren
  onMount(() => {
    window.addEventListener("hashchange", () => updateActivePage(window.location.hash.replace("#", "")));
    updateActivePage(window.location.hash.replace("#", "")); // Initial setzen
  });
  
</script>

<NavBar {activePage} /> 
<Router {routes} on:routeChanged={updateActivePage} />
