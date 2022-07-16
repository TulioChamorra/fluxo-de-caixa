import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankingTransactionsRoutingModule } from './banking-transactions-routing.module';
import { BankingTransactionsDetailsComponent } from './banking-transactions-details/banking-transactions-details.component';

import {AgGridModule} from "ag-grid-angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import { HomeComponent } from '../../home/home.component';
import {BankingTransactionsFormComponent} from "./banking-transactions-form/banking-transactions-form.component";
import {BankingTransactionsListComponent} from "./banking-transactions-list/banking-transactions-list.component";


@NgModule({
  declarations: [
    BankingTransactionsListComponent,
    BankingTransactionsDetailsComponent,
    BankingTransactionsFormComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    BankingTransactionsRoutingModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule
  ]
})
export class BankingTransactionsModule { }
