import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankingTransactionsRoutingModule } from './banking-transactions-routing.module';
import { BankingTransactionsDetailsComponent } from './banking-transactions-details.component';

import {AgGridModule} from "ag-grid-angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import { HomeComponent } from '../../home/home.component';
import {BankingTransactionsUpdateComponent} from "./banking-transactions-update.component";
import {BankingTransactionsComponent} from "./banking-transactions.component";


@NgModule({
  declarations: [
    BankingTransactionsComponent,
    BankingTransactionsDetailsComponent,
    BankingTransactionsUpdateComponent,
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
