<script>
    import Header from "../components/Header.svelte";
    import birdData from "../data/BirdData.json";
    import Footer from "../components/Footer.svelte";

    let categories = Array.from(new Set(birdData.map((bird) => bird.category)));

    // Objekt mit Bildpfaden für jede Kategorie
    const categoryImages = {
        Wasservögel: "/src/images/wasservogel.jpg",
        Waldvögel: "/src/images/waldvogel.jpg",
        Wiesenvögel: "/src/images/wiesenvogel.jpg",
        Gartenvögel: "/src/images/blaumeise.jpg",
        "Greifvögel und Eulen": "/src/images/greifvogeleulen.jpg",
        Küstenvögel: "/src/images/kuestenvogel.jpg",
    };
</script>

<Header title="Zwitscherquiz" subtitle="Wähle dein Quiz" />

<main>

    <div class="grid-section">
        {#each categories as category}
            <a
                class="box"
                href={`#/quiz?category=${encodeURIComponent(category)}`}
            >
                <img
                    src={categoryImages[category] || "/src/images/default.jpg"}
                    alt={category}
                />
                <h2 class="boxtext">{category}</h2>
            </a>
        {/each}
    </div>
</main>

<style>
    .grid-section {
        display: grid;
        grid-template-columns: 2fr;
        gap: 16px;
    }

    @media (min-width: 768px) {
        .grid-section {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    .box {
        all: unset;
        background-color: #a7b487;
        border: 1px solid #a7b487;
        aspect-ratio: 16/11;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        text-align: center;
        gap: 16px;
        position: relative;
        overflow: hidden;
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
