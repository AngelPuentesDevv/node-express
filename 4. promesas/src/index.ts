import app from './app';
import { ServerBootstrap } from './boostrap/server.boostrap';

const server = new ServerBootstrap(app);
/**
 * Función flecha y uso del async/await para iniciar el servidor
 * 
 */
const start = async () => {
    try {
        const instances = [server.init()];
        await Promise.all(instances);
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

start();
