let utenti = [
    {nome: 'Mario', cognome: 'Rossi', eta: 25},
    {nome: 'Luca', cognome: 'Bianchi', eta: 15},
    {nome: 'Gianni', cognome: 'Verdi', eta: 19},
    {nome: 'Pino', cognome: 'Silvestre', eta: 27},
];

export function load({ params }) {
    console.log("ESECUIONE FUNZIONE LOAD:", Date.now());

    // restituiamo la lista degli utenti
    return { utenti }
}

export const actions = {
    default: async ({cookies, request}) => {
        const data = await request.formData();
        console.log("I VALORI DEL FORM SONO:", data)

        utenti.push(
            {
                nome: data.get('nome'),
                cognome: data.get('cognome'),
                eta: data.get('eta')
            }
        )
    }
};