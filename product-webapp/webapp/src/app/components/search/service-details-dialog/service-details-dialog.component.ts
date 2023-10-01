import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-service-details-dialog',
  templateUrl: './service-details-dialog.component.html',
  styleUrls: ['./service-details-dialog.component.css'],
})
export class ServiceDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ServiceDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
