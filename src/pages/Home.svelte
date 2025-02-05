<script>
    import Header from "../components/Header.svelte";
    import Wiki from "../components/Wiki.svelte";
    let birdName = "Stieglitz";
    let excerpt = "";
    import Footer from "../components/Footer.svelte";

    export let activePage;
</script>

<Header title="Zwitscherquiz" subtitle="Hör mal, wer da piept!" />

<main>
    <!-- Hauptinhalt -->
    <div class="grid-section">
        <a class="box" href="#/auswahl">
            <img src="/src/images/blaumeise.jpg" alt="Blaumeise" />
            <h2 class="boxtext">Quiz</h2>
        </a>
        <a class="box" href="#/uebersicht">
            <img src="/src/images/rotkehlchen.jpg" alt="Rotkehlchen" />
            <h2 class="boxtext">Steckbriefe</h2>
        </a>

        <div class="bird-of-the-day">
            <h2 class="bird-ueberschrift">Vogel des Tages</h2>
            <img src="/src/images/{birdName}.jpg" alt={birdName} />
            <div>
                <div class="bird-description">
                    <h3>{birdName}</h3>
                    <Wiki {birdName} bind:excerpt>
                        <!-- Jetzt wird das Excerpt hier verfügbar -->
                    </Wiki>
                    <a href="#/steckbrief/{birdName}"> zum Steckbrief</a>
                </div>
            </div>
        </div>
    </div>
</main>
<Footer text="Vogelquiz - Hör mal wer da piept!" />

<style>
    .grid-section {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        justify-content: center;
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
        transition:
            background-color 0.3s ease,
            transform 0.2s ease;
    }

    .boxtext {
        color: rgb(255, 255, 255);
        position: absolute;
        width: 100%;
        z-index: 10; /* Stellt sicher, dass der Text über dem Bild liegt */
        bottom: 8px;
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

    a {
        color: #ffffff;
        font-size: 16px;
    }

    .bird-of-the-day {
        grid-column: span 2;
        background: #f8f8f8;
        border: 1px solid #a7b487;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        height: 700px;
        width: 100%;
        position: relative;
    }

    .bird-of-the-day::before {
        content: ""; /* Wichtig, um das Pseudo-Element sichtbar zu machen */
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
            to bottom,
            rgba(167, 180, 135, 0) 60%,
            #555555 100%
        );
        z-index: 5; /* Stellt sicher, dass es hinter dem Text, aber über dem Bild liegt */
    }

    .bird-of-the-day img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        flex-grow: 1;
        border-radius: 8px;
    }

    .bird-ueberschrift {
        position: absolute;
        top: 10px;
        text-align: center;
        padding: 8px 16px;
        border-radius: 4px;
        z-index: 10;
        top: 10px;
        color: white;
        left: 50%; 
        transform: translateX(-50%);
    }

    .bird-description {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 16px;
        text-align: center;
        z-index: 10;
        text-align: left;
        display: grid;
        gap: 16px;
    }

    @media (min-width: 768px) {
        .grid-section {
            gap: 24px;
        }

        .box {
            aspect-ratio: 16 / 11;
        }

        .bird-of-the-day {
            grid-row: 2;
        }
    }
</style>
