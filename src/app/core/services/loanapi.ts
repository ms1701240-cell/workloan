import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../enviroment/url.';
import { Observable, map } from 'rxjs'; // ضفنا map هنا
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

  // بنستخرج القائمة من جوه الأوبجكت المدمج
  getEmployees(): Observable<Employee[]> {
    return this.http.get<any[]>(`${this.apiUrl}/employees`).pipe(
      map(res => res[0]?.employees || [])
    );
  }

  // نفس الكلام للخزائن، بنسحبها من نفس الـ endpoint
  getTreasuries(): Observable<Treasury[]> {
    return this.http.get<any[]>(`${this.apiUrl}/employees`).pipe(
      map(res => res[0]?.treasuries || [])
    );
  }

  addLoan(loan: LoanItem): Observable<LoanItem> {
    return this.http.post<LoanItem>(`${this.apiUrl}/loans`, loan);
  }

  updateLoan(id: number | string, loan: LoanItem): Observable<LoanItem> {
    return this.http.put<LoanItem>(`${this.apiUrl}/loans/${id}`, loan);
  }

  deleteLoan(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/loans/${id}`);
  }
}