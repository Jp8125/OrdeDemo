import { Component, OnDestroy, OnInit } from '@angular/core';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { AddOrderModel } from 'src/app/models/add-order-model';
import { Item } from '../../models/item';
import { ItemService } from 'src/app/services/item.service';
import { ToastrService } from 'ngx-toastr';
import { OrderDetails } from '../../models/order-details';
import { SignalRService } from '../../services/signal-r.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {
  Items:Array<Item>=[]
  id:number=0
  sub!:Subscription
  hubconnection!:signalR.HubConnection
  constructor(private Itemservice:ItemService,private toastService:ToastrService,private hubService:SignalRService){}
ngOnInit(): void {
  this.id=parseInt(localStorage.getItem('id') as string)
  this.sub=this.hubService.order.subscribe((res)=>{
    if(res!=null){
      console.log(res);
      this.toastService.success(`Order of ${res.itemName} has received Sucessfully`)
      this.hubService.removeOrderDetail()
    }
  })
  this.Itemservice.getItems().subscribe({
    next:(res)=>{
      this.Items=res
      },
    error:(err)=>{
      console.log(err);
    }
  })
}
createOrder(itemid:number){
  this.hubService.createOrder(itemid)
}
ngOnDestroy(): void {
  this.sub.unsubscribe()
}
}
