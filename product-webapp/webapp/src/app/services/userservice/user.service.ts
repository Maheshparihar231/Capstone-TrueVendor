import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map, shareReplay, switchMap } from 'rxjs';
import { AuthService } from '../authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  userId!: string
  userId$: Observable<string>;
  private apiUrl = 'http://localhost:8002/users/userid';
  constructor(
    private _http: HttpClient,
    private _user: AuthService,

  ) {
    
    this.userId$ = this._user.getData().pipe(
      map((res: any) => res.userId),
      //shareReplay(1)
    );
  }

  getUserDataById(id:any){
    return this._http.get(`${this.apiUrl}/${id}`);
  }

  getUserData(): Observable<any> {
    return this.userId$.pipe(
      switchMap((userId) => {
        const updateUrl = `${this.apiUrl}/${userId}`;
        return this._http.get(updateUrl);
      })
    );
  }

  updateUserData(updatedUserData: any): Observable<any> {
    return this.userId$.pipe(
      switchMap((userId) => {
        const updateUrl = `${this.apiUrl}/${userId}`;
        return this._http.put(updateUrl, updatedUserData);
      })
    );
  }
}
