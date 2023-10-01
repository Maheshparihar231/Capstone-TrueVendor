import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map, shareReplay, switchMap } from 'rxjs';
import { BookingDetails } from 'src/app/model/booking-details';
import { SlotDetails } from 'src/app/model/slot-details';
import { AuthService } from '../authentication/auth.service';
import { UserService } from '../userservice/user.service';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class SlotsService {

  userId$: Observable<string>;
  private bookingApi = 'http://localhost:8002/api/v/booking';

  constructor(
    private _http: HttpClient,
    private _user: AuthService,
  ) {
    this.userId$ = this._user.getData().pipe(
      map((res: any) => res.userId),
      //shareReplay(1)
    );
    
  }

  addBooking(bookingId: string, data: any): Observable<any> {
    return this._http.put<any>(`${this.bookingApi}/updateBooking/${bookingId}`, data);
  }

  deleteSlot(slotId: string): Observable<any> {
    return this._http.delete<any>(`${this.bookingApi}/deleteSlot/${slotId}`);
  }

  getByVendorId(): Observable<any> {
    return this.userId$.pipe(
      switchMap((userId) => {
        const updateUrl = `${this.bookingApi}/slotsBy/${userId}`;
        return this._http.get<any>(updateUrl);
      })
    );
  }

  cancelBooking(id:any): Observable<any> {
   return this._http.delete(`${this.bookingApi}/cancelBooking/${id}`)
  }

  getSlots(serviceName: any): Observable<any> {
    return this._http.get<any>(`${this.bookingApi}/availableSlots/${serviceName}`);
  }

  saveBooking(id: any, bookingData: BookingDetails): Observable<any> {
    return this._http.post<any>(`${this.bookingApi}/saveBooking/${id}`, bookingData);
  }

  saveSlot(slotData: SlotDetails): Observable<any> {
    return this._http.post<any>(`${this.bookingApi}/saveSlotDetails`, slotData);
  }


  findByCustomerId(): Observable<any> {
    return this.userId$.pipe(
      switchMap((userId) => {
        const updateUrl = `${this.bookingApi}/findByCustomerId/${userId}`;
        return this._http.get<any>(updateUrl);
      })
    );
  }

  // getId(id:string){
  //   console.log(id);
  //   this.vendorId = id;
  //   console.log(this.vendorId)
  // }

  findByVendorId(): Observable<any> {
    return this.userId$.pipe(
      switchMap((userId) => {
        const updateUrl = `${this.bookingApi}/findByVendorId/${userId}`;
        return this._http.get<any>(updateUrl);
      })
    );
  }

  setFinished(data : any){
   return this._http.put(`${this.bookingApi}/finish`,data);
  }

  getFinishedVendor(): Observable<any>{
    return this.userId$.pipe(
      switchMap((userId) => {
        const updateUrl = `${this.bookingApi}/finished/${userId}`;
        return this._http.get<any>(updateUrl);
      })
    );
    //this._http.get(`${this.bookingApi}/finished/${id}`)
  }

  getFinishedUser(): Observable<any>{
    return this.userId$.pipe(
      switchMap((userId) => {
        const updateUrl = `${this.bookingApi}/finishedCustomer/${userId}`;
        return this._http.get<any>(updateUrl);
      })
    );
    //this._http.get(`${this.bookingApi}/finishedCustomer/${id}`)
  }

}
