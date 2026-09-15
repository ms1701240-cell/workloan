import { Component, computed, inject, input, model, signal } from '@angular/core';
import { SearchBar } from '../search-bar/search-bar';
import { LucideAngularModule, MessageSquareMore } from 'lucide-angular';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-navbar',
  imports: [SearchBar, LucideAngularModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  icons={
    MessageSquareMore
  }
  translate=inject(TranslateService);
  ismenuopen=signal<boolean>(false);
  toggleMenu(){
    this.ismenuopen.update(open=>!open);
  }
  toogleLang(){
    const currentLang = this.translate.currentLang() || 'en';
    
    // لو اللغة الحالية en خليها ar، والعكس صحيح
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    this.translate.use(newLang);
    document.dir=newLang==='ar'?'rtl':'ltr'
     


  }
 
}
