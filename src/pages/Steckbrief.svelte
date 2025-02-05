<script>
  import { onMount } from "svelte";
  import Wiki from "../components/Wiki.svelte";
  import { fetchImages } from "../lib/Api.js";
  // import {fetchRecordings } from "../pages/Quiz.svelte";
  import birdData from "../data/BirdData.json";
  import Header from "../components/Header.svelte";

  let birdName;
  let bird = {};
  let excerpt;
  let recordings = [];
  let filteredRecordings = {};
  let currentPlayingAudio = null;
  let currentPlayingUrl = "";

  onMount(async () => {
    const hash = window.location.hash;
    const parts = hash.split("/");
    birdName = decodeURIComponent(parts[parts.length - 1]);

    bird = birdData.find(b => b.name === birdName) || {}; // Findet den Vogel im Array

    if (bird) {
      await loadImages();
      await fetchRecordings(birdName);
    }
  });

  const categories = ["call", "song", "alarm", "dawn", "duet", "imitation"];

  const categoryTranslations = {
    call: "Ruf",
    song: "Gesang",
    alarm: "Alarmruf",
    dawn: "Morgengesang",
    duet: "Duett",
    imitation: "Imitation",
  };

  onMount(async () => {
    const hash = window.location.hash; // Holt den Fragment-Teil der URL
    const parts = hash.split("/"); // Teilt den String bei jedem '/'
    birdName = decodeURIComponent(parts[parts.length - 1]);  // Der letzte Teil ist der Vogelname

    await loadImages();
    await fetchRecordings(birdName);
  });

  async function loadImages() {
    const images = await fetchImages(birdName);
    bird.image = images.length > 0 ? images[0].webformatURL : "kohlmeise.jpg";
    bird.name = birdName; // Fügt den Namen hinzu, um im alt-Attribut verwendet zu werden
  }

  async function fetchRecordings(birdName) {
    const apiUrl = `https://xeno-canto.org/api/2/recordings?query=${encodeURIComponent(birdName)}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      recordings = data.recordings;
      filterRecordingsByType();
      console.log("Aufnahmen geladen:", recordings); // Debug: Aufnahmen ausgeben
    } catch (error) {
      console.error("Fehler beim Abrufen der API:", error);
    }
  }

  function filterRecordingsByType() {
    filteredRecordings = recordings.reduce((acc, recording) => {
      categories.forEach((category) => {
        if (recording.type.toLowerCase().includes(category)) {
          if (!acc[category]) {
            acc[category] = [];
          }
          if (acc[category].length < 3) {
            acc[category].push(recording);
          }
        }
      });
      return acc;
    }, {});
  }

  function playSound(fileUrl) {
    if (currentPlayingAudio && currentPlayingUrl === fileUrl) {
      currentPlayingAudio.pause();
      currentPlayingAudio = null;
      currentPlayingUrl = "";
    } else {
      if (currentPlayingAudio) {
        currentPlayingAudio.pause();
      }
      const audioUrl = fileUrl.startsWith("http")
        ? fileUrl
        : `https:${fileUrl}`;
      currentPlayingAudio = new Audio(audioUrl);
      currentPlayingUrl = fileUrl;
      currentPlayingAudio
        .play()
        .catch((error) => console.error("Playback failed:", error));
      currentPlayingAudio.onended = () => {
        currentPlayingAudio = null;
        currentPlayingUrl = "";
      };
    }
  }
</script>

<div class="content-wrapper">
  <Header title="Steckbriefe" subtitle="" />
<!-- Bild -->
<main>
<div class="image-container">

  <button on:click={() => window.history.back()} class="back-button">
    ‹
  </button>

  <div class="image-placeholder">
    <!-- Stelle sicher, dass bird.image existiert, bevor es gerendert wird -->
    {#if bird.image}
      <img src={bird.image} alt={bird.name} />
    {/if}
  </div>
</div>

<div class="container">
  <!-- Bird Info -->
  <h1>{birdName}</h1>
  <p class="latin-name"><em>{bird.latin_name}</em></p> 
  
  <Wiki {birdName} bind:excerpt>
    <!-- Jetzt wird das Excerpt hier verfügbar -->
  </Wiki>

  <!-- Sections
  <div>
    <h2>Kurze Beschreibung</h2>
    <p>
      {excerpt}
    </p>
  </div> -->

  <h2>Vogellaute</h2>
  {#each categories as category}
    {#if filteredRecordings[category]}
      <h3>{categoryTranslations[category]}</h3>
      <div>
        {#each filteredRecordings[category] as recording}
          <button on:click={() => playSound(recording.file)} class="play-button">
            {recording.date}
          </button>
        {/each}
      </div>
    {/if}
  {/each}
</div>
</div>


<style>
  .content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  margin: 0 auto;
}

  .container {
  display: grid;
  gap: 16px; 
  padding: 36px; 
  text-align: left;
}

.latin-name {
    font-style: italic; /* Setzt die Schriftart auf Kursiv */
    color: #555; /* Dunkelgraue Textfarbe für bessere Lesbarkeit */
    font-size: 18px; /* Legt eine spezifische Schriftgröße fest */
    margin-top: -5px; /* Abstand nach oben */
    font-family: 'Times New Roman', Times, serif; 
    text-transform: capitalize;
  }

 .back-button {
  position: absolute; /* Positioniert den Button absolut innerhalb des image-container */
  top: 10px; /* Abstand von der oberen Kante des Containers */
  left: 10px;
  z-index: 10;
  color: #3d3d3d;
  font-size: 40px;
  background-color: white;
  border: none;
 padding: 2px 16px 8px 16px;
  border-radius: 8px;
 }

 .play-button {
    margin: 10px;
    background-color: #f5e7d6;
    padding: 10px 60px 10px 60px;
    border-radius: 8px;
    font-size: 1rem;
    color: #353535;
    border: none;
  }

  button:hover {
    color: #000000;
    background-color: #c2d3b7;
  }

  .image-container {
    display: flex;
    position: relative; /* Ermöglicht die absolute Positionierung des Buttons innerhalb dieses Containers */
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;
  }

  .image-placeholder img {
    width: 100%;
    height: auto; /* Erhält das Seitenverhältnis */
    display: block; /* Entfernt zusätzlichen Abstand unter dem Bild */
  }

  @media (min-width: 768px) {
    .content-wrapper {
    display: grid;
    grid-template-columns: 1fr; /* Zwei gleich breite Spalten */
    gap: 40px; /* Abstand zwischen Bild und Text */
    align-items: center; /* Zentriert Bild und Text vertikal */
  }

    .container {
      align-items: center;
      text-align: left;
      justify-content: center;
    }

    .image-container {
      width: 100%;
      align-items: center;
      justify-content: center;
    }
  }
</style>
