import { Component, ViewChild  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ServiceDetailsDialogComponent } from './service-details-dialog/service-details-dialog.component';
import { SearchService } from 'src/app/services/search/search.service';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { Router } from '@angular/router';
import { ShowSlotsComponent } from '../show-slots/show-slots.component';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})

export class SearchComponent {
  isLoggedIn=false;
  searchQuery: string = '';
  searchResults: any[] = [];
  allServices: any[] = [];
  services_count: any = 0;
  pagedServices: any[] = []; 
  selectedService: any | null = null; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _searchService: SearchService,
    private _user: AuthService,
    private _router: Router,
    private dialog: MatDialog) {}

  onSelectService(service: any) {
    // Open the dialog and pass the selected service data
    const dialogRef = this.dialog.open(ServiceDetailsDialogComponent, {
      width: '500px', // Adjust the width as needed
      height:'500px',
      data: { service },
    });

    dialogRef.afterClosed().subscribe(() => {
      // Dialog closed, do something if needed
    });
  }
  
  ngOnInit() {
    this.loadAllServices();
  }

  loadAllServices() {
    this._searchService.loadAllServices().subscribe((response) => {
    this.allServices = response.content;
    this.services_count=this.allServices.length;
    console.log(this.services_count)
    this.pagedServices = this.allServices.slice(0, this.paginator.pageSize);
    this.paginator.firstPage();
  });
  }

  search() {
    this._searchService.getSearchData(this.searchQuery)
    .subscribe((res)=>{
      console.log(this.searchQuery , this.searchResults);
      this.searchResults=res;
      this.paginator.firstPage(); 
    });
  }

  onPageChange(event:any) {
    const pageIndex = event.pageIndex; 
    const pageSize = event.pageSize;   
  
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
  
    this.pagedServices = this.allServices.slice(startIndex, endIndex);
  }

  getdata():void{
    this._user.getData().subscribe((res:any)=>{
      if(res.name!=null){
        this.isLoggedIn=true;
      }
    })
  }

  onBook(serviceName: any) {
    // Open the dialog and pass the selected service data
    const dialogRef = this.dialog.open(ShowSlotsComponent, {
      data: { serviceName },
    });

    dialogRef.afterClosed().subscribe(() => {
      // Dialog closed, do something if needed
    });
  }
  
}
