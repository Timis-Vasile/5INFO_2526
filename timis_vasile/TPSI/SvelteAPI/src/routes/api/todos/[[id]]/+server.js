import { json } from '@sveltejs/kit';

let todos = [
    {
        id: 1,
        task: "studiare TPSI",
        done: true,
        priority: 1
    }
];

// Funzione GET
export async function GET({ params, request }) {
    const url = new URL(request.url);
    if (params.id) {
        const todo = todos.filter((t) => t.id === parseInt(params.id))[0];
        return json(todo);
    } else {
        let res = todos;
        if (url.searchParams.has("priority")) {
            res = todos.filter(t => t.priority == +url.searchParams.get("priority"));
        } else if (url.searchParams.has("done")) {
            const doneParam = url.searchParams.get("done");
            console.log("Filtro done param:", doneParam);
            res = todos.filter(t => t.done == (doneParam === "true"));
            console.log("Todos filtrati per done:", res);
        }
        return json(res);
    }
}


// Funzione POST

export async function POST({ request }) {
    console.log("Ricevuto HTTP POST");
    const body = await request.json();
    console.log("POST BODY", body);

    // Genera un id casuale
    body["id"] = Math.ceil(Math.random() * 100);

    todos.push(body);

    return json("OK");
}



export async function PUT({params,request}) {
    console.log("RICEVUTO HHTP PUT con parametro:", params);
    const body = await request.json();
    console.log("PUT BODY ",body);
    let todo = todos.findIndex(t => t.id == params.id);
    todos[todo] = body;

    return json("OK");

}

export async function PATCH ({params,request}) {
    console.log("Ricevuto HTTP PATCH con parametro ");

    let body = await request.json();

    let todo = todos.findIndex(t => t.id == params.id);

    const key = Object.keys(body);
    todos[todo][key] = body[key];

    return json("OK");

}

export async function DELETE({params, request}) {
    console.log("RICEVUTO HTTP DELETE CON PARAMETRO",params);
    todos = todos.filter(t => t.id != params.id);
    return json("OK");
}