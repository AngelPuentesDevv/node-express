import express from 'express';
import http from 'http';

//Crear instancia de express
const app = express();

//Inicializar servidor en puerto 4000

const server = http.createServer(app);

server.listen(4000, () => {
    console.log('Servidor iniciado en http://localhost:4000');
});