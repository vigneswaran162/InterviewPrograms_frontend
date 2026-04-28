import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule,NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
 isLeftSideBarCollapsed = input.required<boolean>()
changeIsLeftSidebarCollapsed = output<boolean>();

 items =[
  {
   routerLink:'ProgramList',
   icon:'bi bi-bar-chart',
   label:'DashBoard'
  },
  {
   routerLink:'ProgramMaster',
   icon:'bi-journal-text',
   label:'Q&A Master'
  },
  {
  routerLink:'AddGoals',
   icon:'bi bi-list-check',
   label:'Goals List'
  },{
  routerLink:'itemmaster',
   icon:'bi bi-clipboard-check',
   label:'Goals'
  },
  {
      routerLink:'TableMaster',
   icon:'bi bi-table',
   label:'Table Master'
  },
  {
      routerLink:'Report',
   icon:'bi bi-file-bar-graph',
   label:'Sales Report'
  },{
      routerLink:'itemsaleregister',
   icon:'bi bi-journal-check',
   label:'Item Sale Register'
  }
 ]





   toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSideBarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }
}
