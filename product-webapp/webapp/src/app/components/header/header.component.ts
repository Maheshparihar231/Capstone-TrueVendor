import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { UserService } from 'src/app/services/userservice/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  isLoggedIn =false
  
  constructor(private _route:Router,private _user:AuthService,private _name:UserService){}
  ngOnInit(): void {
    this.isLoggedIn = this._user.isLoggedIn();
    this.getdata();
  }
  
  userName=''
  //get data from backend api
  getdata(){
    this._name.getUserData().subscribe((res:any)=>{
      console.log(res);
      
      this.userName = res.name
    })
  }
  //logout and clear the storage / go to login page
  logout(){
    this._user.Logout();
    localStorage.clear();
    this.isLoggedIn=false
    this._route.navigate(['/homepage']);
  }
  
}
