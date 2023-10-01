import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/core/snackbar.service';
import { SearchService } from 'src/app/services/search/search.service';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent {

  public serForm : FormGroup

  constructor(private _addservice : SearchService,
    private _snack : SnackbarService,
    private _dialogRef: DialogRef<AddServiceComponent>, 
    private _fb : FormBuilder
    ){
      this.serForm = this._fb.group({
        name : ['',[Validators.required]],
        description : ['',[Validators.required]]
      })
    }
  
  addService(){
    //console.log(this.serForm.value);
    
    this._addservice.addService(this.serForm.value).subscribe(
      (res) => {
        console.log(res);
        this._dialogRef.close()
        this._snack.openSnackBar('Service added successfully:')
        
        //console.log('Service added successfully', res);
      },
      (error) => {
        console.error('Error adding service:', error);
      }
    );
  }
  
  isValid(){
    return !this.serForm.valid;
  }

}
