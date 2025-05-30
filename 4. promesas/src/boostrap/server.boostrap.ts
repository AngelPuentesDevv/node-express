import http from "http";
import express from "express";

export class ServerBoostrap {
  //Declaración de atributos
  private app: express.Application;

  constructor(app: express.Application) {
    this.app = app;
  }

  init(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const server = http.createServer(this.app);
      const PORT = process.env.PORT || 4000;

      server.listen(PORT, () => {
        console.log(`Servidor iniciado en http://localhost:${PORT}`);
        resolve(true);
      });

      server.on("error", (error) => {
        console.error("Error al iniciar el servidor:", error);
        reject(false);
      });
    });
  }
}
