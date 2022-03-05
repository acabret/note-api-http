const express = require("express")
const cors = require("cors")
const app = express()

const puerto = 3000

let tareas = [
    { id: 1, nombre: "Sacar gladiator", completado: false },
    { id: 2, nombre: "Ver peep show", completado: false },
    { id: 3, nombre: "farmear 200k de oro en una semana", completado: true },
    { id: 4, nombre: "asdasdasd", completado: true }
  ];

function nuevaId(){
    // return tareas[tareas.length - 1].id + 1
    return Math.max(...tareas.map((itemRecorriendo) => itemRecorriendo.id )) + 1 // 1,2,3,4
}

app.use(express.json())
app.use(cors())

app.get("/api/info", (request, response) => {
    response.status(200).json({author:"fernando", description: "api de prueba basada en el módulo http de node"})

})

app.get("/api/tareas", (request, response) => {
    response.status(200).json({status:200, message:"se muestran las tareas", payload:tareas})

})

app.post("/api/tareas", (request, response) => {
    console.log("recibiendo tarea", request.body);

    if(!request.body.nombre){
        response.status(400).json({status:400, message: "petición hecha de manera incorrecta"})
        return;
    }

    if(request.body.nombre.trim() == 0){
        response.status(400).json({status:400, message: "petición hecha de manera incorrecta"})
        return;
    }

    const nuevaTarea = { id: nuevaId(), nombre: request.body.nombre.trim(), completado: false }
    tareas.push(nuevaTarea)
    response.status(200).json({status:200, message: "se creo la tarea de forma satisfactoria", payload: nuevaTarea})
    return;
})

app.delete("/api/tareas/:id", (request, response) => {
    const id = request.params.id
 
    if(isNaN(id))
    {
        response.status(400).json({status:400, message: "petición hecha de manera incorrecta"})
        return;

    }

    const tareaEncontrada = tareas.find((itemDeArreglo) => itemDeArreglo.id == id)
    tarea = tareas.filter((itemDeArreglo) => itemDeArreglo.id != id)

    // let tareaEncontrada
    // let indiceTarea

    // for (let index = 0; index < tareas.length; index++) {
    //     if(tareas[index].id == id){
    //         indiceTarea = index
    //         tareaEncontrada = tareas[index]
    //     }
    // }

    if(!tareaEncontrada){
        response.status(404).json({status:404, message: "no existe tarea con esa id"})
        return;
    }
    
    // tareas.splice(indiceTarea, 1)
    
    response.status(204).json({status:204, message: "se borro la tarea de forma satisfactoria"})
    return;

})

app.get("/api/tareas/:id", (request, response) => {

    const id = request.params.id
    console.log(id);
 
    if(isNaN(id))
    {
        response.status(400).json({status:400, message: "petición hecha de manera incorrecta"})
        return;
    }

    const tareaEncontrada = tareas.find((itemDeArreglo) => itemDeArreglo.id == id)

    if(!tareaEncontrada){
        response.status(404).json({status:404, message: "no existe tarea con esa id"})
        return;
    }

    response.status(200).json({status:200, message: "se manda una tarea", payload:tareaEncontrada})

})


app.patch("/api/tareas/:id", (request, response) => {
    const id = request.params.id

    if(isNaN(id))
    {
        response.status(400).json({status:400, message: "parámetro inválido"})
        return;
    }
        
    if(!(typeof request.body.completado == "boolean")){
        response.status(400).json({status:400, message: "parámetro inválido"})
        return;
    }

    const tareaEncontrada = tareas.find((tarea) => tarea.id == id)

    if(!tareaEncontrada){
        response.status(404).json({status:404, message: "no existe tarea con esa id"})
        return;
    }

    tareaEncontrada.completado = request.body.completado

    response.status(200).json({status:200, message: "se modifico la completitud de la tarea", payload:tareaEncontrada})

})




app.listen(puerto, () => {
    console.log("api prendida en puerto " + puerto);
})




// const http = require("http")
// const puerto = 3000

// let tareas = [
//     { id: 1, task: "Sacar gladiator", done: false },
//     { id: 2, task: "Ver peep show", done: true },
//     { id: 3, task: "farmear 200k de oro en una semana", done: true },
//   ];

// const server = http.createServer((request, response) => {

    // if(request.url == "/api/info" && request.method == "GET"){
    //     response.writeHead(200, { "Content-Type": "application/json" })
    //     response.write(JSON.stringify({author:"fernando", description: "api de prueba basada en el módulo http de node"}))
    //     response.end()
    // }

//     if(request.url == "/api/tareas" && request.method == "GET"){
//         response.writeHead(200, { "Content-Type": "application/json" })
//         response.write(JSON.stringify(tareas))
//         response.end()
//     }

//     if(request.url == "/api/tareas" && request.method == "POST"){
//         let body = '';
//         request.on('data', buffer => {
//             body += buffer.toString();
//         });
//         request.on('end', () => {
//           const newNote = { id: 5, task: JSON.parse(body).task, done: false };
//           tareas.push(newNote);
//           response.writeHead(200, { "Content-Type": "application/json" });
//           response.write(
//             JSON.stringify({
//               resultado: "tarea creada",
//               nota: newNote
//             })
//           );
//           response.end();
//         });
    
//         return;
//     }


// });

// server.listen(puerto, () => {
//     console.log("api funcionando el puerto", puerto);
// })