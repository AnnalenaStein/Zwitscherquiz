<script>
  import birdData from "../data/BirdData.json";
  import Header from "../components/Header.svelte";
  import Box from "../components/Box.svelte";
  import { fetchImages } from "../lib/Api.js";
  import { fetchImageFromWikipedia } from "../lib/Api.js";
  import Footer from "../components/Footer.svelte";

  import { onMount } from "svelte";

  let birds = birdData;

  async function loadImages() {
    for (let bird of birds) {
      const images = await fetchImages(bird.name);
      bird.image = images.length > 0 ? images[0].webformatURL : "kohlmeise.jpg";
    }
  }

  onMount(async () => {
    await loadImages();
  });
</script>

<Header
  title="Steckbriefe"
  subtitle="Über welchen Vogel möchtest du mehr erfahren?"
/>

<main>
  <div class="grid-container">
    {#each birds as bird}
      <a class="box" href={`#/steckbrief/${encodeURIComponent(bird.name)}`}>
        <img class="img" src={bird.image} alt={bird.name} />
        <h2 class="boxtext">{bird.name}</h2>
      </a>
    {/each}
  </div>
</main>

<style>
  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 16px;
  }

  @media (min-width: 768px) {
    /* Anpassungen für noch größere Bildschirme: 4 Spalten */
    .grid-container {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .box {
        all: unset;
        aspect-ratio: 8 / 10;
        background-color: #a7b487;
        border-radius: 8px;
        /* padding: 16px; */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        overflow: hidden; /* Schneidet überflüssige Inhalte ab */
        text-align: center;
        gap: 16px;
        position: relative;
        border: 1px solid #a7b487;
    }

  .box::before {
    content: ""; /* Wichtig, um das Pseudo-Element sichtbar zu machen */
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(167, 180, 135, 0) 70%,
      #555555 100%
    );
    z-index: 5; /* Stellt sicher, dass es hinter dem Text, aber über dem Bild liegt */
  }

  .box:hover::before {
    background: rgba(0, 0, 0, 0.2);
    }


  .box img {
        min-width: 100%;
        height: 100%;
        min-height: 100%;
        object-fit: cover;
        border-radius: 8px;
    }


    .boxtext {
        color: rgb(255, 255, 255);
        position: absolute;
        width: 100%;
        z-index: 10; /* Stellt sicher, dass der Text über dem Bild liegt */
        bottom: 8px;
    }

</style>

<Footer text="Vogelquiz - Entdecke die Natur!" />
