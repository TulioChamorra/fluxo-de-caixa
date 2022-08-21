import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SavingsComponent} from "./savings.component";

import {SavingsDetailsComponent} from "./savings-details.component";
import {HomeComponent} from "../../home/home.component";
import {SavingsUpdateComponent} from "./savings-update.component";

const routes: Routes = [
  // {path: '', component: HomeComponent},
  {path: 'savings-list', component: SavingsComponent},
  {path: 'create-savings', component: SavingsUpdateComponent},
  {path: 'update-savings/:savingsId', component: SavingsUpdateComponent},
  {path: 'view-savings-details/:savingsId', component: SavingsDetailsComponent},
  {path: '', component: HomeComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SavingsRoutingModule { }
