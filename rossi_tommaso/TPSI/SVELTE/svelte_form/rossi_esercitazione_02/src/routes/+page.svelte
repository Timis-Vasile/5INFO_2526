<script>
    export let data;
</script>

<h1>Welcome to SvelteKit FORM Example</h1>

<form method="POST">
    <div><label for="nome">Nome</label></div>
    <div><input type="text" id="nome" name="nome" size="40"></div>
    <div><label for="cognome">Cognome</label></div>
    <div><input type="text" id="cognome" name="cognome" size="40"></div>
    <div><label for="eta">Età</label></div>
    <div><input type="number" id="eta" name="eta" size="15"></div>
    <div><input type="submit"></div>
</form>

<ul>
    {#each  data.utenti as utente}
        <li>Nome: {utente.nome}, Cognome: {utente.cognome}, Età: {utente.eta}</li>        
    {/each}
</ul>

<style>
    form {
        width: 50%;
        display: grid;
        grid-template-columns: 1fr 4fr;
        row-gap: 15px;
    }
    input, label {
        height: 25px;
        border-radius: 6px;
    }
    label {
        line-height: 25px;
    }
</style>