export const csr = true; // csr attivo
export const ssr = true; //ssr attivo


let utenti = [];

export function load({ params }) {
    console.log("ESECUIONE FUNZIONE LOAD:", Date.now());
    

    return {
        utenti
    }
}

export const actions = {
    default: async ({cookies, request}) => {
        const data = await request.formData();
        console.log("I VALORI DEL FORM SONO: ", data)

        utenti.push(
            {
                nome: data.get("nome"),
                cognome: data.get("cognome"),
                eta: data.get("eta"),
            }
        )
    }

}