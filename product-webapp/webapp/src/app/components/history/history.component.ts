import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookingDetails } from 'src/app/model/booking-details';
import { SlotsService } from 'src/app/services/slots/slots.service';
import { FeedbackComponent } from '../feedback/feedback.component';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit{
  bookings: BookingDetails[] = [];
  //isvendor=false
  constructor(
    private _bookings : SlotsService,
    private _dialog : MatDialog
    ){
  }

  ngOnInit(): void {
    this.getRole()
  }
  //get role from localstorage and fetch data
  getRole(){
    var userRole = localStorage.getItem('userRole')
    //console.log(userRole)
      if (userRole =="Vendor") {
        
        this.getVendorBookings()
      }
      else{
        this.getCustomerBookings()
      }
  }
  //get bookings for customer
  getCustomerBookings(){
    this._bookings.getFinishedUser().subscribe(res=>{
      this.bookings = res
      //console.log(res);
      
    })
  }
  //get bookings for vendor
  getVendorBookings(){
    this._bookings.getFinishedVendor().subscribe(res=>{
      this.bookings =res
      //console.log(this.bookings);
      
    })
  }
  //show feedback form
  showFeedBackForm(id:any){
    //console.log(id);
    
    this._dialog.open(FeedbackComponent,{ data: id })
  }
}
