import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { HttpClient } from '@angular/common/http';
import { UserDetails } from '../models/user-details';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  islogin:boolean=false
  url:string='https://localhost:7267/api'
  constructor(private http:HttpClient,private router:Router) { }
  checkLogin(){
    this.islogin=localStorage.getItem('tkn')!=null?true:false;
    return this.islogin
  }
  login(data:Login){
    this.http.post<UserDetails>(this.url+"/Auth/login",data).subscribe({
      next:(res)=>{
        localStorage.setItem('tkn',res.data.email+res.data.id.toString())
        localStorage.setItem('id',res.data.id.toString())
        localStorage.setItem('role',res.data.role)
        if(res.data.role=="Admin"){
          this.router.navigate(['/admin'])
        }
        else
        {
          this.router.navigate(['/user'])
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  isAdmin(){
    return localStorage.getItem('role')=="Admin"?true:false
  }
  logout(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}
