import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import {  LucideAngularModule,PanelsRightBottom,UserStar,FolderDown,BookOpen,TicketPercent} from 'lucide-angular';

@Component({
  selector: 'app-sidenav',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.css',
})
export class Sidenav {
  icons={
    PanelsRightBottom,
    UserStar,
    FolderDown,
    BookOpen,
    TicketPercent
  } 
  isexpanded=signal<boolean>(true)
    tooglesidebar(){
      this.isexpanded.update(exp=>!exp);
    }
  
}
