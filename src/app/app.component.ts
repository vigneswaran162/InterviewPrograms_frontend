import { Component, HostListener, Inject, PLATFORM_ID, signal } from '@angular/core';

import { SidebarComponent } from '../Forms/sidebar/sidebar.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MainComponent } from '../Forms/main/main.component';

@Component({
  selector: 'app-root',
  imports: [SidebarComponent,CommonModule,MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 
isLeftSideBarCollapsed = signal<boolean>(true);
screenWidth = signal<number>(0);

constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

@HostListener('window:resize')
onResize() {
  if (isPlatformBrowser(this.platformId)) {
    this.screenWidth.set(window.innerWidth);

    if (this.screenWidth() < 768) {
      this.isLeftSideBarCollapsed.set(true);
    }
  }
}

ngOnInit(): void {

  if (isPlatformBrowser(this.platformId)) {
    this.screenWidth.set(window.innerWidth);
    this.isLeftSideBarCollapsed.set(this.screenWidth() < 768);
  }

}

changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean): void {
  this.isLeftSideBarCollapsed.set(isLeftSidebarCollapsed);
}

get islogintoken(): boolean {

  if (typeof window !== 'undefined') {
    return !!localStorage.getItem('login');
  }

  return false;
}
}

