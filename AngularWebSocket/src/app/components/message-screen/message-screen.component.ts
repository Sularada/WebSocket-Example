import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { WebSocketService } from '../../services/web-socket.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-message-screen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './message-screen.component.html',
  styleUrl: './message-screen.component.scss',

})

export class MessageScreenComponent {
  messages: string[] = [];
  msg: string = '';
  constructor(private webSocketService: WebSocketService) { }

  ngOnInit() {
    this.webSocketService.getMessage().subscribe(msg => {
      this.messages.push(msg);
    });
  }

  sendMessage() {
    this.webSocketService.sendMessage(this.msg);
    this.msg = '';
  }

  toggleConnection() {
    const toggleButton = document.getElementById("toggle-btn");
    if (this.webSocketService.isConnected()) {
      toggleButton!.innerText = "Connect";
      this.webSocketService.disconnect();
    } else {
      toggleButton!.innerText = "Disconnect";
      this.webSocketService.connect();
    }
  };
}
