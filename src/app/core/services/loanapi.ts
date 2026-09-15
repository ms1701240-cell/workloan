import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../enviroment/url.';
import { Observable } from 'rxjs';
import { LoanItem, Employee, Treasury } from '../Models/loan.model';
@Injectable({
  providedIn: 'root',
})
export class Loanapi {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  getLoans(): Observable<LoanItem[]> {
    return this.http.get<LoanItem[]>(`${this.apiUrl}/loans`);
  }
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/employees`);
  }
  getTreasuries(): Observable<Treasury[]> {
    return this.http.get<Treasury[]>(`${this.apiUrl}/treasuries`);
  }
  addLoan(loan: LoanItem): Observable<LoanItem> {
    return this.http.post<LoanItem>(`${this.apiUrl}/loans`, loan);
  }
  updateLoan(id: number, loan: LoanItem): Observable<LoanItem> {
    return this.http.put<LoanItem>(`${this.apiUrl}/loans/${id}`, loan);
  }
  deleteLoan(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/loans/${id}`);
  }
 
}
