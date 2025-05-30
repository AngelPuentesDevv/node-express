import app from "./app";
import { ServerBoostrap } from "./boostrap/server.boostrap";

const server = new ServerBoostrap(app);
server.init();
