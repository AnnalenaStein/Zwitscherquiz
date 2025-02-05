<!-- <script>
  let recordings = [];
  let currentAudio = null;

  async function fetchRecordings() {
    const query = "gen:Parus"; // Filter
    const apiUrl = `https://xeno-canto.org/api/2/recordings?query=${query}`;

    const response = await fetch(apiUrl);
    const data = await response.json();
    recordings = [...data.recordings];
    console.log(recordings);
  }

  // Audio abspielen
  function playAudio(fileUrl) {
    const audioUrl = fileUrl.startsWith("http") ? fileUrl : `https:${fileUrl}`;
    console.log("Playing audio from URL:", audioUrl);

    if (currentAudio) {
      currentAudio.pause();
    }

    currentAudio = new Audio(audioUrl);
    currentAudio.onerror = (e) => {
      console.error("Audio playback error:", e);
    };

    currentAudio.play().catch((error) => {
      console.error("Playback failed:", error);
    });
  }

  fetchRecordings();
</script>

<div>
  <h2>Audioaufnahmen</h2>
  {#if recordings.length > 0}
    <ul>
      {#each recordings as recording}
        <li>
          <p>
            <strong>{recording.en}</strong> - {recording.gen}
            {recording.sp}
          </p>
          <button on:click={() => playAudio(recording.file)}>
            Abspielen
          </button>
        </li>
      {/each}
    </ul>
  {:else}
    <p>Lade Aufnahmen...</p>
  {/if}
</div>

<style>
  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin: 0.5rem 0;
  }

  button {
    margin-left: 1rem;
    padding: 0.5rem 1rem;
    background-color: #007acc;
    color: white;
    border: none;
    cursor: pointer;
  }

  button:hover {
    background-color: #005fa3;
  }
</style> -->
