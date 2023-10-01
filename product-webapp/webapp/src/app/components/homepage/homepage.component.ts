import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/login/login.component';
import { CarouselComponent } from '../carousel/carousel.component';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  constructor(
    private _dialog: MatDialog,
  ){}

  openLoginForm(){
    // const dialogConfig = new MatDialogConfig();

    //     dialogConfig.disableClose = true;
    //     dialogConfig.autoFocus = true;

    //     this._dialog.open(CarouselComponent, dialogConfig);
    //const dialogRef = this._dialog.open(LoginComponent);
    // dialogRef.afterClosed().subscribe({ 
    //   next:(val)=>{
    //     if(val){
          
    //     }
    //   }
    // })
  }
}
