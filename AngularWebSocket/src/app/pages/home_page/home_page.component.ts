import { Component } from '@angular/core';
import { MenuComponent } from "../../components/menu/menu.component";
import { MessageScreenComponent } from "../../components/message-screen/message-screen.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MenuComponent, MessageScreenComponent],
  templateUrl: './home_page.component.html',
  styleUrl: './home_page.component.scss',
})
export class HomePageComponent { }
