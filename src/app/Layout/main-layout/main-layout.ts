import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';
import { Sidenav } from '../../components/sidenav/sidenav';
@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, CommonModule, Navbar, Sidenav],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {

}
