import { json } from '@sveltejs/kit';
import { error } from "@sveltejs/kit";
import Database from "better-sqlite3";


const db = new Database("TODO.db", { verbose: console.log });
// let todos = [
//     {
//         id: 1,
//         task: "studiare TPSI",
//         done: true,
//         priority: 1
//     }
// ];

// Funzione GET
export async function GET({ params, request, url }) {
    console.log("Ricevuto HTTP GET con parametro", params);
    const sql_azione2 = db.prepare("SELECT * FROM todo");
    const sql_azione3 = db.prepare("SELECT * FROM todo WHERE id=?");
    const sql_azione4 = db.prepare("SELECT * FROM todo WHERE done=?");
    const sql_azione5 = db.prepare("SELECT * FROM todo WHERE priority=?;");

    const exec_query = (azione, param) => {
        const todo = (param !== undefined) ? azione.all(param) : azione.all();
        if (todo.length > 0) 
            return json(todo, {status:200});
        else
            return json({}, {status: 404});
    };

    try {
        if (params.id) {
            return exec_query(sql_azione3, params.id);
        }
        if (url.searchParams.has("priority")) {
            return exec_query(sql_azione5, +url.searchParams.get("priority"));
        }
        if (url.searchParams.has("done")) {
            // Correzione: parsec non esiste, usare JSON.parse
            return exec_query(sql_azione4, JSON.parse(url.searchParams.get("done")));
        }
        return exec_query(sql_azione2);
    } catch(e) {
        return json({}, {status:500});
    }
}

// Funzione POST
export async function POST({ request }) {
    // console.log("Ricevuto HTTP POST");
    // const body = await request.json();
    // console.log("POST BODY", body);

    // // Genera un id casuale
    // body["id"] = Math.ceil(Math.random() * 100);

    // todos.push(body);

    // return json("OK");
    try{
        const body = await request.json();
        console.log("Ricevuto HTTP POST con body:", body);
        const sql_azione1 = db.prepare(
            "INSERT INTO todo (task, done, priority) VALUES(@task, @done, @priority)"
        );
        const res = sql_azione1.run({
            task: body.task,
            done: +body.done,
            priority: +body.priority,
        });

        if (res.changes == 1) {
            body["id"] = res.lastInsertRowid;
            return json(body, {
                status: 201,
                headers: new Headers({"Location": `http://localhost:5173/api/todos/${body["id"]}`})
            });
        }
    } catch(e) {
        console.log(e);
        return json({}, {status:500});
    }
}

// Funzione PUT
// export async function PUT({params, request}) {
    // console.log("RICEVUTO HTTP PUT con parametro:", params);
    // const body = await request.json();
    // console.log("PUT BODY ", body);
    // // Eliminato l'uso di variabile 'todos' non definita, operazione su DB
    // const sql_update = db.prepare("UPDATE todo SET task = ?, done = ?, priority = ? WHERE id = ?");
    // const res = sql_update.run(body.task, +body.done, +body.priority, params.id);
    // if (res.changes > 0) {
    //     return json("OK");
    // } else {
    //     return json({ error: "Todo non trovato" }, { status: 404 });
    // }
    export async function PUT({ params, request }) {
        try {
            const body = await request.json();
            console.log("Ricevuto HTTP PUT con parametro:", params);
    
            const sql_azione6 = db.prepare(
                "UPDATE todo SET task = @task,done = @done, priority = @priority WHERE id = @id"
            );
    
            const res = sql_azione6.run({
                id: +params.id,
                task: body.task,
                done: +body.done,
                priority: +body.priority
            });
    
            console.log(res);
            if (res.changes == 0) 
                return json({}, {status:404});
            else if (res.changes == 1)
                return json(body, {status:200});
        } catch(e) {
            console.log(e)
            return json({}, {status:500});
        }
    }

// Funzione PATCH
export async function PATCH({params, request}) {
    try {
        const body = await request.json();
        console.log("RIcevuto HTTP PATCH", params);

        const sql_azione7 = db.prepare("UPDATE todo SET task = @task WHERE id = @id");
        const sql_azione8 = db.prepare("UPDATE todo SET priority = @priority WHERE id = @id");
        const sql_azione9 = db.prepare("UPDATE todo SET done = @done WHERE id = @id");
        const sql_get_todo = db.prepare("SELECT * FROM todo  WHERE id = ?");

        let key = Object.keys(body)[0];
        let res;
        switch(key) {
            case "task":
                res = sql_azione7.run({
                    id: +params.id,
                    task: body.task
                });
                 break;
                case "priority":
                    res = sql_azione8.run({
                        id: +params.id,
                        priority: body.priority
                    });
                     break;
                case "done":
                        res = sql_azione9.run({
                            id: +params.id,
                            done: body.done
                        });
                         break;
                        default:
                            return json({}, {status: 500});
                    
                }

            if (res.changes == 0) 
            return json({}, {status:404});
            else if (res.changes == 1) 
            const todo = sql_get_todo.all(+params.id);
            return json({}, {status:200});                    
            
            }
        catch(e) {
            console.log(e)

            return json({}, {status:500});
        }
    }
                 
            
//     console.log("Ricevuto HTTP PATCH con parametro ", params);
//     const body = await request.json();

//     // Per aggiornare specifici campi, iterare le chiavi
//     const keys = Object.keys(body);
//     const setClause = keys.map(k => `${k} = ?`).join(", ");
//     const values = keys.map(k => body[k]);
//     values.push(params.id);

//     const sql_patch = db.prepare(`UPDATE todo SET ${setClause} WHERE id = ?`);
//     const res = sql_patch.run(...values);
//     if (res.changes > 0) {
//         return json("OK");
//     } else {
//         return json({ error: "Todo non trovato" }, { status: 404 });
//     }  
// }

// Funzione DELETE
export async function DELETE({params}) {
    console.log("RICEVUTO HTTP DELETE CON PARAMETRO", params);
    // Se usi il DB, esegui delete nel database
    const sql_delete = db.prepare("DELETE FROM todo WHERE id = ?");
    const res = sql_delete.run(params.id);
    if (res.changes > 0) {
        return json("OK");
    } else {
        return json({ error: "Todo non trovato" }, { status: 404 });
    }
}






















