export const csr = true;
export const ssr = true;

let utenti = [
    {nome : "Mario",cognome : "Rossi" ,eta : 25},
    {nome : "Luca",cognome : "Rossi" ,eta : 15},
    {nome : "Gianni",cognome : "Rossi" ,eta : 19},
    {nome : "Pino",cognome : "Rossi" ,eta : 2}
];

export function load({ params }) {
    console.log("ESECUIONE FUNZIONE LOAD:", Date.now());

    return { utenti }
};

export const actions = {
    default: async ({cookies,request}) => {
        const data = await request.formData();
        console.log("I VALORI DEL FORM SONO : ",data)

        utenti.push(
            {
                nome:data.get('nome'),
                cognome:data.get('cognome'),
                eta:data.get('eta')
            }
        )
    }
};