
import "./infraestructure/config/environment-vars";
import app from './app';
import { ServerBootstrap } from './infraestructure/boostrap/server.boostrap';

const server = new ServerBootstrap(app);


(async () =>{
 try {
        const instances = [server.init()];
        await Promise.all(instances);
    } catch (error) {
        console.error(error);
    }
 }
)();
