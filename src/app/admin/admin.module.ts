import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { OrderListComponent } from './Components/order-list/order-list.component';
import { UserOrdersComponent } from './Components/user-orders/user-orders.component';


@NgModule({
  declarations: [
    AdminComponent,
    OrderListComponent,
    UserOrdersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
