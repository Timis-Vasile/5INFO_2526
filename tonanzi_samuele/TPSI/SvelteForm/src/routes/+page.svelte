
<script>
    export let data; // riceve i dati forniti dal backend durante il load della pagina
</script>

<h1>Welcome to SvelteKit FORM Example</h1>

<form method="POST">
    <div><label for="nome">Nome</label></div>
    <div><input type="text" name="nome" id="nome" siz="48"></div>
    <div><label for="cognome">Cognome</label></div>
    <div><input type="text" name="cognome" id="cognome" siz="48"></div>
    <div><label for="eta">Eta</label></div>
    <div><input type="number" name="eta" id="eta" min="15"></div>
    <div><input type="submit"></div>
</form>

<ul>
    {#each data.utenti as utente}
        <li>{utente.nome} {utente.cognome} ha {utente.eta} anni</li>     
    {/each}
</ul>

<style>
    form{
        width: 50%;
        display: grid;
        grid-template-columns: 1fr 4fr;
        row-gap: 15px;
    }
    input, label {
        height: 25px;
        border-radius: 6px;
    }
    label{
        line-height: 25px;
    }
</style>