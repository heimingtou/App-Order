import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Hoặc cấu hình domain cụ thể của frontend
  },
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    console.log(`Client kết nối: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`Client ngắt kết nối: ${client.id}`);
  }

  // Hàm này dùng để bắn sự kiện có đơn hàng mới đến tất cả client (admin) đang lắng nghe
  sendNewBill(billData: any) {
    this.server.emit('new_bill', billData);
  }
}