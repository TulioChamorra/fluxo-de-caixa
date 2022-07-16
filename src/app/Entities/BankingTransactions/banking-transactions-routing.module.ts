import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BankingTransactionsListComponent} from "./banking-transactions-list/banking-transactions-list.component";

import {BankingTransactionsDetailsComponent} from "./banking-transactions-details/banking-transactions-details.component";
import {HomeComponent} from "../../home/home.component";
import {BankingTransactionsFormComponent} from "./banking-transactions-form/banking-transactions-form.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'banking-transactions-list', component: BankingTransactionsListComponent},
  {path: 'create-banking-transactions', component: BankingTransactionsFormComponent},
  {path: 'update-banking-transactions/:bankingTransactionsId', component: BankingTransactionsFormComponent},
  {path: 'view-banking-transactions-details/:bankingTransactionsId', component: BankingTransactionsDetailsComponent},
  {path: '', component: HomeComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankingTransactionsRoutingModule { }
