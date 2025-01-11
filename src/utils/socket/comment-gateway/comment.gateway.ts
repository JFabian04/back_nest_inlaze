import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3001', // La URL de tu frontend
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
})
export class CommentGateway {
  @WebSocketServer() server: Server;

  handleConnection(client: any) {
    console.log('Client connected: ', client.id);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected: ', client.id);
  }

  // Método para emitir un mensaje a todos los clientes conectados
  emitNewComment(comment: string) {
    this.server.emit('newComment', comment);
  }
}
