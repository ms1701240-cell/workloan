import { Component, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  imports: [FormsModule],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {
  currentPage = input<number>(1);
  totalPages = input<number>();
  totalRecords = input<number>(1);
  
 
  pageSize = model<number>(10); 

  pageChange = output<number>();

  onchangepage(page: number) {
    this.pageChange.emit(page);
  }
}