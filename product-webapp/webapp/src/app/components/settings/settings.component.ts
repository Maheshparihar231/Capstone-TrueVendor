import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from 'src/app/core/snackbar.service';
import { RestapiService } from 'src/app/services/restapi.service';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { UserService } from 'src/app/services/userservice/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  //profileImageLink = 'https://placehold.co/600x600';
  selectedFile: File | null = null;
  showUpdateIcon = false;
  //isDivVisible: boolean = false;
  isVendor: boolean = true;
  profileForm: FormGroup;
  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private _snackBar: SnackbarService,
    private _dataService: AuthService,
    private _userService:UserService,
  ) {
    this.profileForm = this.formBuilder.group({
      name: '',
      about: 'Its my Bio',
      location: '',
      email: '',
      gender: '',
      profileImageLink: 0,
      countryCode: ['+1', Validators.required],
      phoneNumber: ['1234567809', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      selectedService: [[]]
    });
  }

  ngOnInit(): void {
    this.getUserRole();
    this.getUserData();
  }

  

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(DeleteConfirmationComponent, dialogConfig);
  }

  getUserData() {
    this._userService.getUserData().subscribe((res: any) => {
      console.log(res);
      this.profileForm.patchValue({
        name: res.name,
        about: res.about,
        email: res.email,
        location: res.location,
        gender: res.gender,
        countryCode: res.countryCode,
        phoneNumber: res.phoneNumber,
      })
    })
  }

  hideDiv() {
    //this.isDivVisible=false
  }

  getUserRole(){
    this._dataService.getData().subscribe((res:any)=>{
      if(res.userRole="Vendor"){
        console.log(res);
        this.isVendor=true;
      }
    })
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log('Selected File:', file);
      this.profileForm.patchValue({
        profileImageLink: file
      })
      console.log(this.profileForm.value.profileImageLink);
      // const fileName = file.name;
      // console.log('File Name:', fileName);
      // const fileSize = file.size;
      // console.log('File Size (bytes):', fileSize);
      // const fileType = file.type;
      // console.log('File Type:', fileType);
    } else {
      console.log('No file selected.');
    }
  }

  requestData() {
    this._snackBar.openSnackBar('Your Data will be mailed to you with in 7 days');
  }

  onProfileUpdate() {
    if (this.profileForm.valid) {
      const updatedUserData = this.profileForm.value;
      this._userService.updateUserData(updatedUserData).subscribe(
        (response) => {
          console.log('User data updated successfully:', response);
          //console.log('Form submitted:', this.profileForm.value);
          this.getUserData();
          this._snackBar.openSnackBar('Profile Updated Successfully')
        }, (error) => {
          console.error('Error updating user data:', error);
        });
    }
  }
}


