import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { OrderDetails } from '../../models/order-details';
import { SignalRService } from '../../services/signal-r.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {
  list: Array<OrderDetails> = []
  sub!: Subscription
  ngOnInit(): void {
    let uId = parseInt(localStorage.getItem('id') as string)
    this.sub = this.orderService.getOrders(uId).subscribe({
      next: (res) => {
        this.list = res
      }
    })
    this.hubService.order.subscribe((res) => {
      if (res != null) {
        this.list = this.list.map(det => {
          if (det.orderId == res.orderId) {
            return res;
          } else {
            return det;
          }
        });
        if(res.isAccepted==true){
          this.toastrService.success(`Dear User Your Order Of ${res.itemName} for Rs.${res.itemPrice} is Accepted`)
        }
        else
        {
          this.toastrService.error(`Dear User Your Order Of ${res.itemName} for Rs.${res.itemPrice} is Rejected`)
        }
        this.hubService.removeOrderDetail()
      }
    })
  }
  constructor(private orderService: OrderService, private hubService: SignalRService,private toastrService:ToastrService) { }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }
}
