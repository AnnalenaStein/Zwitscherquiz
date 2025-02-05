<script>
  import { onMount } from "svelte";

  export let birdName;
  export let excerpt = "";

  let cache = {}; // Caching der Anfragen, um API-Rate-Limits zu vermeiden

  // Wikipedia-Daten abrufen (mit Deutsch als bevorzugter Sprache, Englisch als Fallback)
  async function fetchBirdExcerpt(birdName) {
    if (!birdName) return;

    // Prüfen, ob der Wert bereits im Cache ist
    if (cache[birdName]) {
      excerpt = cache[birdName];
      return;
    }

      // Anfrage an deutsche Wikipedia
      let response = await fetch(`https://de.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(birdName)}`);
      let data = await response.json();

      if (data.extract) {
        excerpt = data.extract;
        cache[birdName] = data.extract; // Speichern im Cache
        return;
      }
    }


  // Lädt die Daten bei der ersten Seitenladung
  onMount(() => {
    if (birdName) {
      fetchBirdExcerpt(birdName);
    }
  });

  // Falls sich `birdName` ändert, lade die neue Beschreibung
  $: if (birdName) {
    fetchBirdExcerpt(birdName);
  }
</script>

<!-- Anzeige der Beschreibung -->
<p class="wiki-excerpt">{excerpt}</p>

<style>
  .wiki-excerpt {
    font-size: 16px;
    color: #333;
    line-height: 1.5;
    background: #f8f8f8;
    padding: 12px;
    border-radius: 5px;
    text-align: left;
    overflow: hidden; 
    display: -webkit-box;
    -webkit-line-clamp: 6; 
    -webkit-box-orient: vertical;
    max-height: calc(1.6em * 6);
  }

  @media (min-width: 768px) {
    .wiki-excerpt {
        -webkit-line-clamp: unset; /* Entfernt die Begrenzung auf größeren Bildschirmen */
        max-height: none;
        overflow: visible;
    }
}
</style>
