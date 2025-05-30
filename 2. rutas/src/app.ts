import express, { Request, Response } from 'express';

//Gestión de rutas con Express

//Crear instancia de express
const app = express();

app.get("/", (request: Request, response: Response)=>{
    response.send("Primera ruta con Express"); 
});

app.get("/check", (request: Request, response: Response)=>{
    response.send("Segunda ruta con Express"); 
});

export default app;