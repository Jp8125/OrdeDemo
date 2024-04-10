import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDetails } from '../user/models/order-details';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url:string='https://localhost:7267/api'
  constructor(private http:HttpClient) { }
  getOrders(id:number){
     return this.http.get<OrderDetails[]>(this.url+`/orders/${id}`)
  }
}
