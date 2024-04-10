import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:string='https://localhost:7267/api'
  constructor(private http:HttpClient){}
  GetUsers(){
    return this.http.get<User[]>(this.url+'/User')
  }
}
