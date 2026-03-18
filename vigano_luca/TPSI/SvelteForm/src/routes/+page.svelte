<script>
    export let data; // riceve i dati forniti dal backend durante il load della pagina
</script>

<h1>Welcome to SvelteKit FORM Example</h1>

<ul> <!-- Visualizza una lista di utenti ricevuti dal back end-->
{#each data.utenti as utente} 
    <li>{utente}</li>
{/each}
</ul>
