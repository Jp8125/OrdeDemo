import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user';
import { OrderDetails } from 'src/app/user/models/order-details';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  users:User[]=[]
  Orders:OrderDetails[]=[]
  ngOnInit(): void {
    this.userService.GetUsers().subscribe({
      next:(res)=>{
        console.log(res);
        
        this.users=res
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
  constructor(private userService:UserService){}

}
