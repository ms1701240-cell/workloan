import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent:()=>import('./Layout/main-layout/main-layout').then(m => m.MainLayout),
        children: [
            { path: 'loan', loadComponent: () => import('./pages/loan/loan').then(m => m.Loan) },
        ]
     },
    
    
];
