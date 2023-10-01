import { Component,Output ,EventEmitter, OnInit, HostListener} from '@angular/core';

interface SideNavToggle{
  screenwidth : number;
  collapsed : boolean;
}

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css']
})
export class SidenavbarComponent implements OnInit{
  

  @Output() onToggleSideNav : EventEmitter<SideNavToggle> = new EventEmitter();
  @HostListener('window:resize',['$event'])

  onResize(event:any){
    this.screenwidth = window.innerWidth;
    if(this.screenwidth<-768){
      this.collapsed=false;
      this.onToggleSideNav.emit({collapsed : this.collapsed , screenwidth:this.screenwidth});
    }
  }
  ngOnInit(): void {
    this.screenwidth = window.innerWidth;
  }
  collapsed = false
  screenwidth = 0;
  navData = [
    {
      routerLink: 'dashboard',
      icon: 'fa-solid fa-home',
      label: 'Dashboard'
    },
    {
      routerLink: 'settings',
      icon: 'fa-solid fa-gear',
      label: 'Settings'
    },
    {
      routerLink: 'history',
      icon: 'fa-solid fa-clock-rotate-left',
      label: 'History'
    },
  ]; 

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed : this.collapsed , screenwidth:this.screenwidth});
  }
  closeSideNav() {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed : this.collapsed , screenwidth:this.screenwidth});
  }
}
