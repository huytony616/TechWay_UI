import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductsComponent } from './components/products/products.component';
import { OVprodsComponent } from './components/ovprods/ovprods.component';
import { SigninComponent } from './components/signin/signin.component';
import { AuthGuard } from "./_auth/auth.guard";
import { ForbiddenComponent } from './components/forbidden/forbidden.component';

const routes: Routes = [
  {path:'',component:DashboardComponent, canActivateChild:[AuthGuard], data:{role:['ROLE_DIRE','ROLE_STAFF']}},
  {path:'newprod',component:ProductsComponent, canActivateChild:[AuthGuard], data:{role:['ROLE_DIRE','ROLE_STAFF']}},
  {path:'ovprod',component:OVprodsComponent, canActivateChild:[AuthGuard], data:{role:['ROLE_DIRE','ROLE_STAFF']}},
  {path:'dashboard',component:DashboardComponent, canActivateChild:[AuthGuard], data:{role:['ROLE_DIRE','ROLE_STAFF']}},
  {path:'signin',component:SigninComponent},
  {path:'403',component:ForbiddenComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [ AuthGuard ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
