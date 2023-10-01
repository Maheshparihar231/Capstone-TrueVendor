import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmailService } from 'src/app/services/email/email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  public emailForm : FormGroup
  loading = false;

  constructor(private formBuilder : FormBuilder ,private _send : EmailService){
    this.emailForm = this.formBuilder.group({
      to : '',
      subject : '',
      message : ''
    })
  }

  onSend(){this.loading = true;
    console.log(this.emailForm.value);
     this._send.sendEmail(this.emailForm.value).subscribe((res)=>{
      console.log(res)
      this.loading = false;
     },(error)=>{
      console.log(error)
      this.loading = false;
    })
  }
}
