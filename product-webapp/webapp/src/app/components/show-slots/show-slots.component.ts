import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddBookingComponent } from '../add-booking/add-booking.component';
import { AddSlotComponent } from '../add-slot/add-slot.component';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { BookingDetails } from 'src/app/model/booking-details';
import { SlotsService } from 'src/app/services/slots/slots.service';
import { SnackbarService } from 'src/app/core/snackbar.service';
import { UserService } from 'src/app/services/userservice/user.service';
import { EmailService } from 'src/app/services/email/email.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { EmailData } from 'src/app/model/email-data';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM/DD',
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};


@Component({
  selector: 'app-show-slots',
  templateUrl: './show-slots.component.html',
  styleUrls: ['./show-slots.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class ShowSlotsComponent implements OnInit {
  slots: any[] = [];
  bookingData: BookingDetails = new BookingDetails();
  emailData : EmailData = new EmailData();
  slotDate = '';
  errorMsg = '';
  // serviceName = '';
  isVendor : boolean = false
  loading = false;
  email : string = ''
  email$: Observable<string> = new BehaviorSubject<string>(''); // Initialize with an empty string
  emailForm : FormGroup
  vendorId!: string
  constructor(
    private _slots: SlotsService,
    private _dialog: MatDialog,
    private _snack: SnackbarService,
    private _email: EmailService,
    private _fb : FormBuilder,
    private _dialogRef: MatDialogRef<ShowSlotsComponent>, 
    private _user : UserService,
    @Inject(MAT_DIALOG_DATA) public booking: any) {
      this.emailForm = this._fb.group({
        to : '',
        subject : '',
        message : ''
      })
     }

  ngOnInit(): void {

    this.getRole()
    this.bookingData = this.booking;
    
    //console.log(typeof(this.booking));
    this.getSlots('');
    //this.getSlotsByVendorId()
    // this.search('');
    this.getUserData();
  }

  openAddBookingForm(data: any) {
    this.loading = true;
    if (this.bookingData.bookingId!=null) {
      this.bookingData.slotId = data.slotId;
      this.bookingData.slotDate = data.slotDate;
      this.bookingData.startTime = data.startTime;
      this.bookingData.endTime = data.endTime;
      this.bookingData.vendorId = data.vendorId;
      this.bookingData.vendorName = data.vendorName;
      this.bookingData.visitingCharges = data.visitingCharges;
      //console.log(this.bookingData)
      this._slots.addBooking(this.bookingData.bookingId, this.bookingData)
        .subscribe((res) => {
          console.log(res);
          this.loading = false;
          alert('booking updated')
          this._dialogRef.close();
        }, _error => { this.errorMsg = "No Slot for service" })
    } else {
      //console.log(data.slotId)
      this._slots.saveBooking(data.slotId,this.bookingData).subscribe((res)=>{
        this.loading = true;
        console.log(res);
        this.getvendorEmail(res.vendorId);
        this.emailForm.value.subject='Booking Confirmed'
        this.emailForm.value.message = JSON.stringify(this.bookingData)
        //console.log(this.emailForm.value);
        //this.emailForm.value.to=this.email
        //this._email.sendEmail(this.emailForm.value).subscribe((res)=>{});
        this._snack.openSnackBar('Booking added , you will receive confimation email')
        this._dialogRef.close();
      })
      //this._dialog.open(AddBookingComponent, { data.slotId });
    }
  }
// jatin#%1234
  getRole(){
    var userRole = localStorage.getItem('userRole')
      if (userRole == 'Vendor') {
        this.getSlotsByVendorId();
        this.isVendor = true;
      }
  }

  getvendorEmail(id: any) {
    this._user.getUserDataById(id).subscribe(( res:any )=>{
      this.emailForm.value.to = res.email;
      console.log(this.emailForm.value);
      this._email.sendEmail(this.emailForm.value).subscribe(res=>{})
    })
  }

  getUserData(){
    this._user.getUserData().subscribe((res:any)=>{
      //console.log(res);
      this.bookingData.customerId = res.userId
      this.bookingData.customerAddress = res.location
      this.bookingData.customerName = res.name
    })
  }

  openAddSlotForm() {
    this._dialog.open(AddSlotComponent);
  }

  deleteSlot(slotId: any) {
    if (this.booking) {
      this._dialogRef.close();
    } else {
      this._slots.deleteSlot(slotId).subscribe((res) => {
        console.log(res);
        this._snack.openSnackBar('slot deleted');
        this.getSlotsByVendorId();
      })
    }
  }

  getSlots(serviceName: any) {
    console.log(this.bookingData.serviceName)
    this._slots.getSlots(this.bookingData.serviceName).subscribe((res) => {
      console.log(this.booking)
      this.slots = res;
      // console.log(res);
      this.errorMsg = "";
    }, _error => { this.errorMsg = "No Slot for service" })
  }

  // searchSlotByDate(date: any) {
  //   this._http.get<any>(`http://localhost:8063/api/v/booking/getSlotsByDate/${date}`).subscribe((res) => {
  //     if (res != null) {
  //       this.slots = res;
  //       console.log(res);
  //       this.errorMsg = "";
  //     }
  //     else {
  //       this.errorMsg = "No slot available for this date";
  //     }
  //   }, _error => { this.errorMsg = "error" })
  // }

  getSlotsByVendorId() {
    this._slots.getByVendorId().subscribe((res) => {
      if (res != null) {
        this.slots = res;
        console.log(res);
        this.errorMsg = "";
      } else {
        this.errorMsg = "No slot added";
      }
    }, _error => {
      this.errorMsg = "no Slot for this id"
    }
    )
  }

}
