<script>
    import { onMount } from "svelte";
    import { fetchImages } from "../lib/Api.js";
    import Header from "../components/Header.svelte";
    import birdData from "../data/BirdData.json";
    import Button from "../components/Button.svelte";
    import { push } from "svelte-spa-router";

    // Bilder laden
    let images = [];
    let query = "Vogelname"; // Dies würde dynamisch basierend auf dem gewählten Vogel gesetzt

    // Kategorie aus der URL extrahieren
    const urlParams = new URLSearchParams(window.location.hash.split("?")[1]);
    const selectedCategory = urlParams.get("category");

    onMount(async () => {
        await loadNewOptions();
    });

    // Filtern der Vögel nach Kategorie
    let birds = birdData.filter((bird) => bird.category === selectedCategory);

    // Zustand für Quiz
    let isQuizStarted = false;
    let currentBird = null; // Der aktuell zu ratende Vogel
    let currentAudioUrl = ""; // URL der aktuellen Audioaufnahme
    let isLoading = false;
    let currentAudio = null;
    let recordings = [];
    let chosen = false;
    let correctAnswer = null;
    let correctAnswers = 0;
    let currentBirdName = null;
    let currentQuestionIndex = 0;
    // Anzahl Fragen:
    const totalQuestions = 10;
    let isQuizCompleted = false;
    let percentage = 0;
    let options = [];

    // Prozentzahl für Endscreen
    function calculatePercentage() {
        percentage = Math.round((correctAnswers / totalQuestions) * 100);
    }

    // Funktion, um einen Vogel zufällig als den aktuellen zu wählen und drei weitere zufällige Vögel auszuwählen
    async function loadNewOptions() {
        currentBird = birds[Math.floor(Math.random() * birds.length)];
        let remainingBirds = birds.filter((bird) => bird !== currentBird);
        let shuffled = [...remainingBirds].sort(() => 0.5 - Math.random());
        let selectedOptions = shuffled.slice(0, 3);
        options = [currentBird, ...selectedOptions];
        options.sort(() => 0.5 - Math.random());
        correctAnswer = currentBird.name;

        // Bild laden
        const images = await fetchImages(currentBird.name);
        currentBird = {
            ...currentBird,
            image: images.length > 0 ? images[0].webformatURL : "kohlmeise.jpg",
        };
    }

    // Funktion, um Aufnahmen von der API zu laden
    async function fetchRecordings(bird) {
        isLoading = true;
        try {
            const query = `gen:${bird.gen}`;
            const apiUrl = `https://xeno-canto.org/api/2/recordings?query=${query}`;

            const response = await fetch(apiUrl);
            const data = await response.json();
            recordings = [...data.recordings];

            if (recordings.length > 0) {
                playAudio(recordings[0].file);
            } else {
                console.warn(`Keine Aufnahmen für ${bird.name} gefunden.`);
            }
        } catch (error) {
            console.error("Fehler beim Abrufen der API:", error);
        } finally {
            isLoading = false;
        }
    }

    // Funktion, um Audio abzuspielen
    function playAudio(fileUrl) {
        const audioUrl = fileUrl.startsWith("http")
            ? fileUrl
            : `https:${fileUrl}`;
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

    function handleChoice(birdName) {
        chosen = true;
        currentBirdName = birdName;
        if (birdName === correctAnswer) {
            correctAnswers++;
        }
    }

    function nextBird() {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0; // Setzt die Wiedergabezeit auf den Anfang zurück
        }

        if (currentQuestionIndex < totalQuestions - 1) {
            currentQuestionIndex++;
            loadNewOptions();
            chosen = false; // Zurücksetzen des Auswahlstatus für die nächste Frage
        } else {
            isQuizCompleted = true;
            calculatePercentage();
        }
    }
</script>

<Header title={selectedCategory} subtitle="" />
<main>
    <!-- Bilder -->
    {#each images as image}
        <img class="img" src={image.webformatURL} alt={image.tags} />
    {/each}

    <!-- Fortschrittsanzeige -->
    <div class="progress">
        {#each Array(totalQuestions) as _, index}
            <span class="dot {index <= currentQuestionIndex ? 'active' : ''}"
            ></span>
        {/each}
    </div>

    {#if isQuizCompleted}
        <div class="instructions">
            <h5>{percentage}%</h5>
            <h2>Super! Du hast das {selectedCategory}quiz gelöst.</h2>
            <Button class="button" on:click={() => push("/")}>Weiter</Button>
        </div>
    {:else}
        <div class="quiz-container">
            {#if !isQuizStarted}
                <div class="instructions">
                    <p>Klicke auf "Start", um mit dem Quiz zu beginnen.</p>
                    <Button
                        class="button"
                        on:click={() => {
                            isQuizStarted = true;
                            loadNewOptions();
                        }}>Start</Button
                    >
                </div>
            {:else}
                <!-- Quiz -->
                <div class="question-container">
                    {#if chosen && currentBird}
                        <img src={currentBird.image} alt={currentBird.name} />
                    {:else}
                        <p>Welcher Vogel singt?</p>
                    {/if}
                </div>

                <!-- Audioaufnahme -->
                <div>
                    {#if isLoading}
                        <p class="play-button">Lade Audio...</p>
                    {:else}
                        <button
                            class="play-button"
                            on:click={() => fetchRecordings(currentBird)}
                        >
                            🎵 Play
                        </button>
                    {/if}
                </div>

                <!-- Antwortoptionen -->
                <div class="options">
                    {#each options as bird}
                        <button
                            class="option {chosen
                                ? bird.name === correctAnswer
                                    ? 'correct'
                                    : 'incorrect'
                                : ''} {chosen ? 'disabled' : ''}"
                            on:click={() => handleChoice(bird.name)}
                        >
                            {bird.name}
                        </button>
                    {/each}
                </div>
            {/if}

            <!-- Weiterbutton -->
            {#if chosen}
                <Button
                    class="button"
                    on:click={nextBird}
                    disabled={currentQuestionIndex === totalQuestions - 1}
                >
                    Weiter
                </Button>
            {/if}
        </div>
    {/if}
</main>

<style>
    .progress {
        display: flex;
        gap: 16px;
        margin-bottom: 16px;
        justify-content: center;
    }

    .dot {
        width: 16px;
        height: 16px;
        background-color: #d3d3d3;
        border-radius: 50%;
    }

    .dot.active {
        background-color: #a7b487;
    }


    .quiz-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 16px;
    }

    .instructions {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        gap: 24px;
        height: 50vh;
    }

    .question-container {
        background-color: #f8f8f8;
        border: 1px solid #a7b487;
        /* padding: 120px 10px 120px 10px; */
        height: 220px;
        aspect-ratio: 16/9;
        border-radius: 8px;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }

    img {
        width: 100%;
        height: auto;
        overflow: hidden;
    }

    .play-button {
        margin: 10px;
        background-color: #f5e7d6;
        padding: 12px 56px;
        border-radius: 8px;
        font-size: 1rem;
        color: #545454;
        border: none;
    }

    .options {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        max-width: 100%;
    }

    .option {
        background-color: #a7b487;
        color: black;
        border: none;
        border-radius: 8px;
        padding: 16px;
        width: 180px;
        height: 120px;
        text-align: center;
        font-size: 1rem;
    }

    .option:hover {
        background-color: #8fa16c;
        /* transform: scale(1.05);
        transition:
                background-color 0.3s,
                transform 0.3s; */
    }

    .option.correct {
        background-color: #6a7649;
        color: white;
    }

    .option.incorrect {
        background-color: #d7e2d0; /* Rot für die falsche Antwort */
        color: #545454;
    }

    @media (min-width: 768px) {
        .quiz-container {
            gap: 8px;

        }
        .dot {
            width: 16px;
            height: 16px;
        }

        .question-container {
            height: 220px;
            width: 416px;
        }

        .play-button {
            width: 200px; /* Feste Breite, anpassen nach Bedarf */
            height: 48px; 
            font-size: 1em;
            white-space: nowrap; 
            text-align: center;
            justify-content: center;
            font-size: 1em;
            transition:
                background-color 0.3s,
                transform 0.3s;
        }

        .play-button:hover {
            background-color: #c9d4c3;
        }

        .option {
            width: 200px;
            height: 110px;
            font-size: 1.1em;
        }
    }
</style>
