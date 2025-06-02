import express, { Request, Response } from "express";

class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.routes();
  }

  private routes(): void {
    //aquí getionaremos las rutas
    this.app.get("/", (request: Request, response: Response) => {
      response.send("Hola Mundo");
    });

    this.app.get("/check", (request: Request, response: Response) => {
      response.send("Check");
    });

    this.app.get("/test", (request: Request, response: Response) => {
      response.send("esto es un test o una prueba");
    });
    this.app.get("/nodemons", (request: Request, response: Response) => {
      response.send("nodemons");
    });
  }

  getApp(){
    return this.app;
  }
}

export default new App().getApp();
