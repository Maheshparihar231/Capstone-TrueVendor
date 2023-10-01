import { DialogRef } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/core/snackbar.service';
import { BookingDetails } from 'src/app/model/booking-details';
import { SlotsService } from 'src/app/services/slots/slots.service';

// export const MY_DATE_FORMATS = {
//   parse: {
//     dateInput: 'YYYY/MM/DD',
//   },
//   templateUrl: './add-booking.component.html',
//   providers: [
//     { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
//   ]
// }

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
  selector: 'app-add-slot',
  templateUrl: './add-booking.component.html',
  styleUrls: ['./add-booking.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})

export class AddBookingComponent{
  bookingData: BookingDetails = new BookingDetails();
  constructor(
    private _dialogRef: DialogRef<AddBookingComponent>, 
    private _snack: SnackbarService,
    private _addBooking:SlotsService) {}
  

  onFormSubmit(id: any) {
    this._addBooking.saveBooking(id,this.bookingData).subscribe((res)=>{
      console.log(res);
      this._snack.openSnackBar('Booking added')
      this._dialogRef.close();
    })
  }

  
  }
