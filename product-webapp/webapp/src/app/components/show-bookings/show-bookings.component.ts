import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookingDetails } from 'src/app/model/booking-details';
import { AddBookingComponent } from '../add-booking/add-booking.component';
import { ShowSlotsComponent } from '../show-slots/show-slots.component';
import { SnackbarService } from 'src/app/core/snackbar.service';
import { SlotsService } from 'src/app/services/slots/slots.service';
import { UserService } from 'src/app/services/userservice/user.service';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmailService } from 'src/app/services/email/email.service';

@Component({
  selector: 'app-show-bookings',
  templateUrl: './show-bookings.component.html',
  styleUrls: ['./show-bookings.component.css']
})
export class ShowBookingsComponent implements OnInit {
  bookings: BookingDetails[] = [];
  // booking!: BookingDetails;
  isVendor : boolean =  false
  emailForm : FormGroup
  customerId = '';
  vendorId='';
  errorMessage = '';
  constructor(
    private _book: SlotsService, 
    private _http:HttpClient,
    private dataservice: AuthService,
    private _dialog: MatDialog,
    private _user : UserService,
    private _fb : FormBuilder,
    private _email: EmailService,
    private _snack : SnackbarService) { 
      this.emailForm = this._fb.group({
        to : '',
        subject : '',
        message : ''
      })
    }
  
  ngOnInit(): void {
    this.getVendorBooking()
    this.getCustomerBooking()
    this.getRole()
  }

  openUpdateBookingForm(data:any) {
    this._dialog.open(ShowSlotsComponent,{data,});
  }

  setFinished(data:any){
    this._book.setFinished(data).subscribe((res=>{}))
    this._snack.openSnackBar('Marked as Done');
  }

  cancelBooking(id: any) {
    this._book.cancelBooking(id).subscribe((res) => {
      console.log(res);
      this.getCustomerBooking()
      this.getVendorBooking();
      this.emailForm.value.subject = 'Booking Cancelled'
      this.emailForm.value.message = JSON.stringify(res);
      this.getvendorEmail(res.customerId);
      this._snack.openSnackBar('booking canceled');
    })
  }
// billu#%1234
  getvendorEmail(id: any) {
    this._user.getUserDataById(id).subscribe(( res:any )=>{
      this.emailForm.value.to = res.email;
      console.log(this.emailForm.value);
      this._email.sendEmail(this.emailForm.value).subscribe(res=>{})
    })
  }

  getRole(){
    var userRole = localStorage.getItem('userRole')
      if (userRole == 'Vendor') {
        this.isVendor = true;
      }
  }

  getVendorBooking():void {
    //console.log(id)
    this._book.findByVendorId().subscribe((res) => {
      if (res != null) {
        this.bookings = res;
        //console.log(this.vendorId)
        // console.log(res);
      } else {
        this.errorMessage = 'No booking available';
      }
    },(error)=>{console.log('No booking available')})
  }

  getCustomerBooking() {
    this._book.findByCustomerId().subscribe((res) => {
      if (res != null) {
        this.bookings = res;
        //console.log(this.vendorId)
        // console.log(res);
      } else {
        this.errorMessage = 'No booking available';
      }
    },(error)=>{console.log('No booking available')})
  }


}
