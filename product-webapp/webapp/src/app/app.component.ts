import { Component } from '@angular/core';
interface SideNavToggle{
  screenwidth : number;
  collapsed : boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'webapp';
  isSlideNavCollapsed = false;
  screenwidth = 0;
  onToggleSideNav( data : SideNavToggle):void{
    this.screenwidth = data.screenwidth;
    this.isSlideNavCollapsed= data.collapsed;
  }
}
