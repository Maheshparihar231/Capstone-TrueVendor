import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/core/snackbar.service';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {

  feedbackForm: FormGroup
  isVendor = true
  constructor(
    private _fb: FormBuilder,
    private feedbackService: FeedbackService,
    private _snackbar: SnackbarService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public id: any
  ) {
    this.feedbackForm = this._fb.group({
      rating: 1,
      title: '',
      description: '',
      bookingId: id
    })
    //check if data is present if not then create new
    this.feedbackService.getFeedbackByBookingId(id).subscribe((res) => {
      this.feedbackForm.patchValue(res);
    },
      (err) => {
        if (err.status === 404) {
          this.feedbackService.createFeedback(this.feedbackForm.value).subscribe(res => {
            console.log('feedbackcreated');
          })
        }
      }

    )
    this.getRole()

  }
  //get role from localstorage to enable and disable buttons
  getRole() {
    var userRole = localStorage.getItem('userRole')
    console.log(userRole)
    if (userRole != "Vendor") {
      this.isVendor = false;
    }
  }

  //submit button for user
  submit(): void {  
    console.log(this.feedbackForm.value);
      
    this.feedbackService.updateFeedback(this.feedbackForm.value).subscribe(res => {
      this._snackbar.openSnackBar('feedback sent');
      this.dialog.closeAll();
      console.log('updated');
    })
  }

}
