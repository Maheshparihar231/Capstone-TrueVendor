import { Component ,Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit{
  ngOnInit(): void {
  }

  @Input() collapsed = false;
  @Input() screenwidth = 0;

  getBodyClass(): string {
    let styleClass = '';
    if(this.collapsed && this.screenwidth>768){
      styleClass='body-trimmed';
    }else if(this.collapsed && this.screenwidth<=768 && this.screenwidth>0){
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }
}
