import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.css']
})
export class DeleteConfirmationComponent {
  
  verificationInput=''
  
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  onCancelClick(): void {
    console.log('CANCEL')
    this.dialogRef.close('CANCEL');
  }

  onConfirmClick(): void {
    console.log('DELETE')
    this.dialogRef.close('DELETE');
  }
}
