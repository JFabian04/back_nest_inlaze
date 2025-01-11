import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';

export class SocketIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions) {
    const server = super.createIOServer(port, options);

    // Aquí puedes añadir configuración adicional si la necesitas
    server.on('connection', (socket) => {
      console.log('Nuevo socket conectado:', socket.id);
    });

    return server;
  }
}
