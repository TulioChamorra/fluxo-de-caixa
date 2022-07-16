import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'crud', pathMatch: 'full'},
  {path: 'crud', loadChildren: ()=> import('./Entities/BankingTransactions/banking-transactions.module').then(m=>m.BankingTransactionsModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
