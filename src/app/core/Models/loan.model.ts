export interface LoanItem {
  id: number;
  date: string;
  employeeID: number;
  employeeEnName?: string;
  treasuryID: number;    
  treasuryName?: string;  
  amount: number | string;
  StartMonth: string;
  numberOfDeduction: number;
  notes?: string;
}

export interface Employee {
  id: number;
  en_name: string;
  ar_name: string;
}

export interface Treasury {
  id: number;
  name: string; 
}