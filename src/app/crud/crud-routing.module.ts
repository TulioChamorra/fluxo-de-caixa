import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductListComponent} from "./product-list/product-list.component";
import {ProductFormComponent} from "./product-form/product-form.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'product-list', component: ProductListComponent},
  {path: 'create-product', component: ProductFormComponent},
  {path: 'update-product/:productId', component: ProductFormComponent},
  {path: 'view-product-details/:productId', component: ProductDetailsComponent},
  {path: '', component: HomeComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CRUDRoutingModule { }
