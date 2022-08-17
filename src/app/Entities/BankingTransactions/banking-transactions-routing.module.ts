import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BankingTransactionsComponent} from "./banking-transactions.component";

import {BankingTransactionsDetailsComponent} from "./banking-transactions-details.component";
import {HomeComponent} from "../../home/home.component";
import {BankingTransactionsUpdateComponent} from "./banking-transactions-update.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'banking-transactions-list', component: BankingTransactionsComponent},
  {path: 'create-banking-transactions', component: BankingTransactionsUpdateComponent},
  {path: 'update-banking-transactions/:bankingTransactionsId', component: BankingTransactionsUpdateComponent},
  {path: 'view-banking-transactions-details/:bankingTransactionsId', component: BankingTransactionsDetailsComponent},
  {path: '', component: HomeComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankingTransactionsRoutingModule { }
