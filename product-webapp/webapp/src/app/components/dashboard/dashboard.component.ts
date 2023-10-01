import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { RestapiService } from 'src/app/services/restapi.service';
import { AddSlotComponent } from '../add-slot/add-slot.component';
import { UserService } from 'src/app/services/userservice/user.service';
import { AddServiceComponent } from '../add-service/add-service.component';
import { ShowSlotsComponent } from '../show-slots/show-slots.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  greeting: string='Welcome';
  username: string='';
  response: string | undefined
  isVendor: boolean = false;
  vendorId!:string
  constructor(
    private _dialog: MatDialog,
    private _dataService: AuthService,
    private _user : UserService
  ) {
   // this.setGreeting();
   }
  
  ngOnInit(): void {
    this.getUserRole()
  }

  // setGreeting() {
  //   const currentHour = new Date().getHours();
  //   if (currentHour >= 0 && currentHour < 12) {
  //     this.greeting = 'Good morning';
  //   } else if (currentHour >= 12 && currentHour < 17) {
  //     this.greeting = 'Good afternoon';
  //   } else {
  //     this.greeting = 'Good evening';
  //   }
  // }

  getUserRole() {
    this._dataService.getData().subscribe((res: any) => {
      this.vendorId = res.userId      
      localStorage.setItem('userRole', res.userRole);
      var userRole = localStorage.getItem('userRole')
      if (userRole == 'Vendor') {
        console.log(res);
        this.isVendor = true;
      }
    })
    this._user.getUserData().subscribe(res=>{
      this.username = res.name
    })
  }
  
  addSlots() {
    this._dialog.open(AddSlotComponent,{data:this.vendorId });
  }

  showSlot(){
    this._dialog.open(ShowSlotsComponent);
  }

}


