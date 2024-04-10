import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { OrderListComponent } from './Components/order-list/order-list.component';
import { UserOrdersComponent } from './Components/user-orders/user-orders.component';

const routes: Routes = [{ path: '', component: AdminComponent,children:[
  {path:'orders',component:OrderListComponent,children:[
    {path:'user-order/:Uid',component:UserOrdersComponent}
  ]},
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
