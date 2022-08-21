import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SavingsRoutingModule } from './savings-routing.module';
import { SavingsDetailsComponent } from './savings-details.component';

import {AgGridModule} from "ag-grid-angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import { HomeComponent } from '../../home/home.component';
import {SavingsUpdateComponent} from "./savings-update.component";
import {SavingsComponent} from "./savings.component";


@NgModule({
  declarations: [
    SavingsComponent,
    SavingsDetailsComponent,
    SavingsUpdateComponent,
    // HomeComponent,
  ],
  imports: [
    CommonModule,
    SavingsRoutingModule,
    AgGridModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule
  ]
})
export class SavingsModule { }
