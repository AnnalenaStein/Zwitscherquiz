<script>
    import { createEventDispatcher } from 'svelte';
    export let text = "";
    export let className = "";

    const dispatch = createEventDispatcher();

    function handleClick() {
        dispatch('click'); // Benennt das Ereignis als 'click'
    }
</script>

<!-- zum Button einfügen: /> -->
<button class="button" on:click={handleClick}>
    <slot>Standard Button</slot> <!-- Standardtext, falls kein Inhalt übergeben wird -->
</button>


<style>
   .button {
        background-color: #B95D12;
        color: white;
        padding: 12px 60px;
        font-size: 1rem;
        border: none;
        border-radius: 8px;
        transition: background-color 0.3s ease, transform 0.2s ease;
        text-align: center;
        margin: 10px;
    }

    .button:hover {
        background: #cd7833;
    }

    .button:active {
        background: #b35507;
        color: white;
    }

</style>
