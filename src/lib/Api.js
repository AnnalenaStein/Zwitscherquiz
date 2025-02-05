// Pixabay
const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;  // Ersetzen Sie dies mit Ihrem tatsächlichen API-Key von Pixabay

export { fetchImages };
export {fetchImageFromWikipedia};
let cache = {}; 

async function fetchImages(birdName) {

  if (cache[birdName]) {
    console.log(`Cache verwendet für: ${birdName}`);
    return cache[birdName]; // Rückgabe des gecachten Werts
  }

  const query = `${encodeURIComponent(birdName)} (Vogel)`;
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&lang=de`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.hits && data.hits.length > 0) {
      cache[birdName] = data.hits; // Speichert die Ergebnisse im Cache
      return data.hits;
    } else {
      // Wenn kein Pixabay-Bild gefunden wurde, Wikipedia abrufen
      const wikiImage = await fetchImageFromWikipedia(birdName);
      cache[birdName] = wikiImage; // Speichert das Wikipedia-Bild im Cache
      return wikiImage;
    }
  } catch (error) {
    console.error("Fehler beim Abrufen von Bildern:", error);
    const wikiImage = await fetchImageFromWikipedia(birdName);
    cache[birdName] = wikiImage; // Speichert das Wikipedia-Bild im Cache
    return wikiImage; // Fallback: Wikipedia-Bild nutzen
  }
}

async function fetchImageFromWikipedia(birdName) {
  
  if (cache[`wiki_${birdName}`]) {
    console.log(`Cache verwendet für Wikipedia: ${birdName}`);
    return cache[`wiki_${birdName}`];
  }

  try {
    const response = await fetch(`https://de.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(birdName)}`);
    const data = await response.json();
    if (data.thumbnail && data.thumbnail.source) {
      cache[`wiki_${birdName}`] = [{ webformatURL: data.thumbnail.source }];
      return [{ webformatURL: data.thumbnail.source }];
    }
  } catch (error) {
    console.error("Fehler beim Abrufen des Wikipedia-Bildes:", error);
  }
}


