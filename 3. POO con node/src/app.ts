import express, { Request, Response } from "express";

class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.routes();
  }

  private routes(): void {
    //Gestión de rutas con Express
    this.app.get("/", (request: Request, response: Response) => {
      response.send("Primera ruta con Express");
    });

    this.app.get("/check", (request: Request, response: Response) => {
      response.send("Segunda ruta con Express");
    });
  }

  getApp() {
    return this.app;
  }
}

export default new App().getApp();
