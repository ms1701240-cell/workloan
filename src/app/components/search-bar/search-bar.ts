import { Component, output } from '@angular/core';
import { input,model } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
KeysArray=input<string[]>([]);
value=model<string>('');
searchEvent=output<string>();
show=input<'navbar'|'table'>('table');

isexpanded=model<boolean>(false);

toogleSearch(){
  this.isexpanded.update(val => !val);
}
onsearchEvent(val:string){
this.searchEvent.emit(val);
}
}
