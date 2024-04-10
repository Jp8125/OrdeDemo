import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AddOrderComponent } from './components/add-order/add-order.component';

const routes: Routes = [
  { path: '', component: UserComponent ,children:[
    { path: '',redirectTo:'orders',pathMatch:'full'},
    {path:'orders',component:OrdersComponent},
    {path:'add',component:AddOrderComponent}
   ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
