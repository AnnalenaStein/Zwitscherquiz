<script>
    export let year = new Date().getFullYear(); // Automatisch aktuelles Jahr
    export let text = "Alle Rechte vorbehalten.";
</script>

<footer class="footer">
    <div class="footer-content">
        <p>&copy; {year} Vogelquiz | {text}</p>
        <nav class="footer-nav">
            <a href="#/impressum/">Impressum</a>
            <a href="#/impressum/">Datenschutz</a>
            <a href="#/impressum/">Kontakt</a>
        </nav>
    </div>
</footer>

<style>
    .footer {
        width: 100%;
        background-color: #a7b487;
        color: black;
        text-align: center;
        padding: 16px 0;
        position: relative;
        bottom: 0;
        left: 0;
    }

    .footer-content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0px 0px 80px 0px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }

    .footer-nav {
        display: flex;
        gap: 16px;
    }

    .footer-nav a {
        color: black;
        text-decoration: none;
        font-size: 14px;
    }

    .footer-nav a:hover {
        text-decoration: underline;
    }

    @media (min-width: 768px) {
        .footer-content {
            flex-direction: row;
            justify-content: space-between;
            padding: 0 24px;
            max-width: 1200px;
            margin: 0 auto;
            gap: 8px;
        }
    }
</style>
