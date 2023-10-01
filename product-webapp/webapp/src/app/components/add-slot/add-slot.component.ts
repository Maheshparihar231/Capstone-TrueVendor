import { DialogRef } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SlotDetails } from 'src/app/model/slot-details';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { SlotsService } from 'src/app/services/slots/slots.service';
import { SnackbarService } from 'src/app/core/snackbar.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/userservice/user.service';
import { SearchService } from 'src/app/services/search/search.service';

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
  templateUrl: './add-slot.component.html',
  styleUrls: ['./add-slot.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class AddSlotComponent implements OnInit{
  slot: SlotDetails = new SlotDetails();
  constructor(
    private _dialogRef: DialogRef<AddSlotComponent>, 
    private _slot: SlotsService, 
    private _snack : SnackbarService,
    private route:Router,
    private _service : SearchService,
    private _user : UserService,
    @Inject(MAT_DIALOG_DATA) public id: any
    ) {}
  ngOnInit(): void {
    this.setUserData()
    this.getAllServices()
  }

  getAllServices(){
    this._service.loadAllServices().subscribe((res: any) => {
      const servicesFromResponse = res.content.map((service: any) => {
        return { id: service.id, name: service.name };
      });
    
      // Now, assign the services to your Services variable
      this.Services = servicesFromResponse;
      console.log(this.Services);
    }); 
  }

  Services = [
    { id: 1, name: "plumbing" },
  ];
  

  setUserData(){
    this._user.getUserData().subscribe((res)=>{
      this.slot.vendorLocation = res.location
      this.slot.vendorName = res.name
      this.slot.vendorId = this.id
    })
  }

  onFormSubmit() {

    this._slot.saveSlot(this.slot).subscribe((res: any) => {

      this._snack.openSnackBar('slot added');
      console.log(res);
      this._dialogRef.close();
      //this.route.navigate(['/slots']);

    })
  }

}
