import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pagination } from '../../components/pagination/pagination';
import { SearchBar } from '../../components/search-bar/search-bar';
import { NgClass } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Loanapi } from '../../core/services/loanapi';
import { Employee, Treasury, LoanItem } from '../../core/Models/loan.model';



@Component({
  selector: 'app-loan',
  imports: [Pagination,FormsModule,SearchBar,NgClass,TranslatePipe,CommonModule],
  templateUrl: './loan.html',
  styleUrl: './loan.css',
})
export class Loan implements OnInit {
   service=inject(Loanapi);
  isRtl=signal<boolean>(false);
  isModalVisible=signal<boolean>(false);
  mode=signal<'add'|'edit'>('add');
  isLoading = signal<boolean>(false);
  
  employees=signal<Employee[]>([]);
  treasuries=signal<Treasury[]>([]);
  displayEndMonth=signal<string>('');
  public TableData=signal<LoanItem[]>([]);
  resetform(){
    this.loan.set({
      id: 0,
      date: '',
      employeeID: 0,
      employeeEnName: '',
      treasuryID: 0,
      treasuryName: '',
      amount: 0,
      StartMonth: '',
      numberOfDeduction: 0,
      notes: ''
    });
this.displayEndMonth.set('');
  }
  loan=signal<LoanItem>({
    id: 0,
    date: '',
    employeeID: 0,
    employeeEnName: '',
    treasuryID: 0,
    treasuryName: '',
    amount: 0,
    StartMonth: '',
    numberOfDeduction: 0,
    notes: ''
  });
  create(){
    this.resetform();
    this.mode.set('add');
    this.isModalVisible.set(true);
  }
  edit(item:LoanItem){
    this.loan.set(item);
    this.mode.set('edit');
    this.isModalVisible.set(true);
  }
  delete(id:number){
    this.service.deleteLoan(id).subscribe({
      next:()=>{
        this.loadData();
      },
      error: (err) => console.error('Error deleting loan:', err)
    })
  
  }
  CreateOREdit() {
    
    if (this.mode() === 'add') {
      this.service.addLoan(this.loan()).subscribe({
        next:()=>{
          this.loadData();
          this.isModalVisible.set(false)
        },
        error: (err) => console.error('Error adding loan:', err)
      });
    } else {
      const LoanId=this.loan().id
      if(!LoanId)return
     this.service.updateLoan(LoanId,this.loan()).subscribe({
      next:()=>{
        this.loadData();
        this.isModalVisible.set(false);
      },
       error: (err) => console.error('Error adding loan:', err)
     });
    }
  }
  onMonthChange(){
    this.CalculateEndMonth();
  }
  onNumberOfDeductionChange(){
    this.CalculateEndMonth();
  }
  CalculateEndMonth(){
    
    const startMonthStr = this.loan().StartMonth;
    if (!startMonthStr) return;
    
    const startMonth = new Date(`${startMonthStr}-01`);
    const numberOfDeduction = Number(this.loan().numberOfDeduction) || 0;
    
    const endMonth = new Date(startMonth.getFullYear(), startMonth.getMonth() + numberOfDeduction - 1, 1);
    const formattedEndMonth = endMonth.toISOString().slice(0, 7); 
    
    this.displayEndMonth.set(formattedEndMonth);
  }
  onInputValueChange(field:keyof LoanItem, value:string|number){
    let finalvalue=value
   if(field==='amount'){
     let num=Number(value);
     finalvalue=num<0?0:num;
   } else if(field==='numberOfDeduction'){
     let num=Number(value);
     finalvalue=num<1?1:num;
   }

    this.loan.update((prev)=>({
      ...prev,
      [field]:finalvalue
    }))
    if(field==='StartMonth' || field==='numberOfDeduction'){
      this.CalculateEndMonth();
    }
  }
  validationerrors(field:keyof LoanItem, message:string):boolean{
    const value=this.loan()[field];
    return value=='' || value===0 || value===null || value===undefined;
  }
  onKeyPress(event: KeyboardEvent) {
    const allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',  'Backspace', 'ArrowLeft', 'ArrowRight'];
    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }
  
  CurrentPage=signal<number>(1);
  PageSize = signal<number>(10);      
  value=signal<string>('');
  keysArray=signal<(keyof LoanItem)[]>(['id', 'employeeEnName', 'treasuryName', 'amount']);
   isexpanded=signal<boolean>(false);

 filtredData=computed(()=>{
  const query=this.value().toLowerCase().trim();
  const data=this.TableData();
  if(!query){
    return data;
  }

  return data.filter(item=>this.keysArray().some(key=>String(item[key]).toLowerCase().includes(query)))
 })
 TotalRecords=computed(()=>{
  return this.filtredData().length;
 })
 TotalPages=computed(()=>{
  return Math.ceil(this.TotalRecords()/this.PageSize());
 })
 paginatedData=computed(()=>{
  const startIndex=(this.CurrentPage()-1)*this.PageSize();
  const endIndex=startIndex+this.PageSize();
  return this.filtredData().slice(startIndex,endIndex);
 })

  onPageChange(newpage:number){
     this.CurrentPage.set(newpage)
  }
 

  OnChangeEvent(query:string){
    this.value.set(query);
  }
   
  private loanApi = inject(Loanapi);
ngOnInit(): void {
this.loadData();
}
loadData(){
  this.isLoading.set(true);
  this.loanApi.getLoans().subscribe({
    next: (data) => {
        this.TableData.set(data);
        this.isLoading.set(false);
    },
    error: (error) => {
      console.error('Error fetching loans:', error);
      this.isLoading.set(false);
    }
  });

  this.loanApi.getEmployees().subscribe({
    next: (data) => {
      this.employees.set(data);
    },
    error: (error) => {
      console.error('Error fetching employees:', error);
    }
  });

  this.loanApi.getTreasuries().subscribe({
    next: (data) => {
      this.treasuries.set(data);
    },
    error: (error) => {
      console.error('Error fetching treasuries:', error);
    }
  });         
}
}
