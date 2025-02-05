<script>
   export let bird;

</script>

<button class="box"
>
  <img src={bird.image} alt={bird.name} class="box-image" />
  <h2 class="boxtex">{bird.name}</h2>
</button>


<style>
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

  .box:hover {
    background-color: rgba(
      0,
      0,
      0,
      0.5
    ); /* Endzustand bei Hover: halbtransparent */
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
