import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  constructor(private socket: Socket) {
    this.socket.connect();
  }

  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }
  getMessage() {
    return this.socket.fromEvent('message')
  }
  disconnect() {
    this.socket.disconnect();
  }
  connect() {
    this.socket.connect();
  }
  isConnected() {
    return this.socket.connected
  }
}
