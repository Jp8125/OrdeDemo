import { Injectable, OnInit } from '@angular/core';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { OrderDetails } from '../models/order-details';
import { BehaviorSubject } from 'rxjs';
import { AddOrderModel } from 'src/app/models/add-order-model';

@Injectable({
  providedIn: 'root'
})
export class SignalRService{
  hubconnection!:signalR.HubConnection
  order:BehaviorSubject<OrderDetails|null>
  id:number=0
  constructor() { 
    this.order=new BehaviorSubject<OrderDetails|null>(null)
    this.id=parseInt(localStorage.getItem('id') as string)
    this.connectHub()
    this.HubEvents()
  }

  connectHub(){
    this.hubconnection=new HubConnectionBuilder().withUrl(`https://localhost:7267/orderHub?Uid=${this.id}`).build()
    this.hubconnection.start().then(()=>{
      console.log("connected to the server");
    }).catch((err)=>{
      console.log("error",err);
    })
  }
  HubEvents(){
    this.hubconnection.on("updateOrderDetais",(order:OrderDetails)=>{
      this.order.next(order)     
     })
     this.hubconnection.on("updateDetais",(orderUpdate:OrderDetails)=>{
      console.log(orderUpdate);
      this.order.next(orderUpdate)
     })
  }
  createOrder(itemid:number){
    let order:AddOrderModel={userId:this.id,itemId:itemid}
    this.hubconnection.send("AddOrder",order)
  }
  removeOrderDetail(){
    this.order.next(null)
  }
}
