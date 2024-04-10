import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup
  ngOnInit(): void {
    this.loginForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
      // ,Validators.pattern(/^[A-Za-z0-9!@#$%^&*]{6}/gm)
    })
  }
  constructor(private fb:FormBuilder,private authservice:AuthService){}
  loginUser(){
    this.authservice.login(this.loginForm.value)
    this.loginForm.valid
  }
}
