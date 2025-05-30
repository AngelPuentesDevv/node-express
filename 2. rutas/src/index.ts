import app from "./app";
import http from "http";

//Inicializar servidor en puerto 4000
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;

server.listen(4000, () => {
  console.log("Servidor iniciado en http://localhost:4000");
});
