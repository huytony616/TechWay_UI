import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { OVprodsComponent } from './components/ovprods/ovprods.component';

const routes: Routes = [
  {path:'',component:DashboardComponent},
  {path:'newprod',component:ProductsComponent},
  {path:'ovprod',component:OVprodsComponent},
  {path:'dashboard',component:DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
