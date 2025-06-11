import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageScreenComponent } from './components/message-screen/message-screen.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MessageScreenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AngularWebSocket';
}
