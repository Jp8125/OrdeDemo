import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from 'src/app/services/order.service';
import { OrderDetails } from 'src/app/user/models/order-details';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit{
  uid:number=0
  orderList:OrderDetails[]=[]
  connectionhub!:signalR.HubConnection
ngOnInit(): void {
  this.activatedRoute.params.subscribe((res)=>{
    console.log(res['Uid']);
    this.uid=parseInt(res['Uid'])
    this.orderService.getOrders(res['Uid']).subscribe({
      next:(res)=>{
        this.orderList=res
      },
      error:(err)=>{
        console.log(err);
      }
    })
  })
  this.connectHub()
}
constructor(private activatedRoute:ActivatedRoute,private orderService:OrderService,private toast:ToastrService){}
connectHub(){
  let id=localStorage.getItem('id')
  console.log(id);
  this.connectionhub=new HubConnectionBuilder().withUrl(`https://localhost:7267/orderHub?Uid=${id}`).build()
  this.startConnection()
  this.connectionhub.on("notify",(res:OrderDetails)=>{
    console.log(res);
    this.toast.success(`you got Order for ${res.itemName} of amount ${res.itemPrice} from ${res.name}`)
    this.orderList.push(res)
  })
  this.connectionhub.on("updateDetais",(res)=>{
    console.log(res);
  })
}
startConnection(){
  this.connectionhub.start().then(()=>{
    console.log("connected to the server");
  })
  .catch((err)=>{
    console.log(err);
  })
}
AcceptOrders(orderId:number){
this.connectionhub.invoke("UpdateOrder",orderId,this.uid,true)
}
RejectOrders(orderId:number){
  this.connectionhub.invoke("UpdateOrder",orderId,this.uid,false)
}
}
