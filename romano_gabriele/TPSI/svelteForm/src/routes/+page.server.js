export const csr = true; // csr attivo
export const ssr = true; //ssr attivo

export const actions = {
    default: async ({cookies, request}) => {
        const data = await request.formData();
        console.log("I VALORI DEL FORM SONO:", data);

        utenti.push(
            {
                nome: data.get('nome'),
                cognome: data.get('cognome'),
                eta: data.get('eta')
            }
        )
    }
}

export function load({ params }) {
    console.log("ESECUIONE FUNZIONE LOAD:", Date.now());

    // creo la lista degli utenti. Qui potrei accedere al DB
    let utenti = [
        'Mario',
        'Luca',
        'Gianni',
        'Pino'
    ];

    // restituiamo la lista degli utenti
    return { utenti }
}