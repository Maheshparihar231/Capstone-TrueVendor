import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { UserService } from 'src/app/services/userservice/user.service';
import { AddSlotComponent } from '../add-slot/add-slot.component';
import { MatDialog } from '@angular/material/dialog';
import { AddServiceComponent } from '../add-service/add-service.component';
interface SideNavToggle{
  screenwidth : number;
  collapsed : boolean;
}
@Component({
  selector: 'app-controlpanel',
  templateUrl: './controlpanel.component.html',
  styleUrls: ['./controlpanel.component.css']
})
export class ControlpanelComponent implements OnInit{

  issidebarclosed=false
  
  constructor(
    private _user:UserService,
    private router : Router,
    private _logincheck : AuthService,
    private _dialog: MatDialog,
    ){
      this.getdata()
      this.getUserId()  
      this.getRole()
    }
  ngOnInit(): void {
    this.getRole()
    this.getdata()
    this.getUserId()
  }

  userName=''
  isLoggedIn =true
  isVendor=false
  vendorId!:string
  //logout clear storage
  logout(){
    this._logincheck.Logout()
    localStorage.clear();
    this.router.navigate(['/homepage']);
    this.isLoggedIn=false;
  }
  //get data from backend api
  getdata(){
    this._user.getUserData().subscribe((res:any)=>{
      this.userName =res.name
    })
  }
  //get user role
  getRole(){
    var userRole = localStorage.getItem('userRole')
    console.log(userRole)
      if (userRole =="Vendor") {
        this.isVendor = true;
      }
  }

  getUserId() {
    this._logincheck.getData().subscribe((res: any) => {
      this.vendorId = res.userId
    })
  }
  //add service
  addService(){
    this._dialog.open(AddServiceComponent);
  }
  //toggleing the drawer
  toggleDrawer(){
    this.issidebarclosed=!this.issidebarclosed
  }
}
