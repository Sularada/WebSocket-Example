import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { ChipModule } from 'primeng/chip';
import { SupabaseService } from '../../services/supabase.service';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [SidebarModule, ButtonModule, CommonModule, ChipModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  constructor(private supabaseService: SupabaseService, private messageService: MessageService) { }

  isMobile: boolean = false;
  sidebarVisible: boolean = true;
  user: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  async ngOnInit() {
    this.checkScreenSize();
    try {
      const user = await this.supabaseService.getCurrentUserData()
      console.log(user)
      this.user.next(user.data)
      console.log(this.user)
      if (this.user == null) {
        throw new Error('Kullanıcı bulunamadı');
      }
    } catch (error: any) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message });
    }
  }

  @HostListener('window:resize')
  checkScreenSize() {
    this.isMobile = window.innerWidth < 798;
    this.sidebarVisible = !this.isMobile;
  }

  openSidebar() {
    this.sidebarVisible = true;
  }

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Closes the sidebar if the screen size is mobile.
   * @returns void
   */
  /*******  caa231d8-c278-4516-8683-5bf66cc2003c  *******/
  closeSidebar() {
    if (this.isMobile) {
      this.sidebarVisible = false;
    }
  }
}
