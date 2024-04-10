import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../user/models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  url:string='https://localhost:7267/api'
  constructor(private http:HttpClient) { }
  getItems(){
     return this.http.get<Item[]>(this.url+`/Items`)
  }
}
